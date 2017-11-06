import {
    Component, OnInit, Inject, DoCheck, AfterViewInit, ViewChild,
    AfterViewChecked, Output, EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';
import { IntervalPipe } from "../common/interval.pipe"
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';

import { IResPlan, IProject, IInterval, ProjectActiveStatus, IResource, Resource, Timescale, WorkUnits, Result } from './res-plan.model'

import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ResPlan, Project, Interval } from './res-plan.model';
import { SimpleModalComponent } from '../common/simple-modal.component'
import { ModalCommunicator } from '../resourcePlans/modal-communicator.service';
import { ProjectService } from '../services/project-service.service'
import { ResourcePlanService } from '../services/resource-plan.service'
import { ResourcePlanUserStateService } from '../services/resource-plan-user-state.service'
import { ResourcesModalCommunicatorService } from '../resourcePlans/resources-modal-communicator.service'
import {ResPlanHeaderRowComponent} from "../resourcePlans/res-plan-header-row/res-plan-header-row.component"
import { AppStateService } from '../services/app-state.service'

@Component({
    selector: 'resplan-list',
    templateUrl: './res-plan-list.component.html',
    styles: [`*
{
    padding: 0;
    margin: 0;
}
body
{
    height: 100%;
    width: 100%;
}
table
{
    border-collapse: collapse;
}
.outer-container
{
    background-color: #ccc;
    position: absolute;
    top:0;
    left: 0;
    right: 300px;
    bottom: 40px;
}
.inner-container
{
    height: 100%;
    overflow: hidden;
}
.table-header
{
    position: relative;
}
.table-body
{
    overflow: auto;
    height:auto;
    width:auto;
}
.header-cell
{
    text-align: left;
    height: 40px;
}
.body-cell 
{
    text-align: left;
}
.col1
{
    width:220px;
    min-width: 220px;
}
.col
{
    width:100px;
    min-width: 100px;
}`]
})


export class ResPlanListComponent implements OnInit {

    @ViewChild('modalProjects') private modalProjects: SimpleModalComponent;
    @ViewChild('modalResources') private modalResources: SimpleModalComponent;
    @ViewChild('header') private header: ResPlanHeaderRowComponent;
    

    mainForm: FormGroup;
    resPlanData: IResPlan[] = [];
    projData: IProject[];
    currentFormGroup: FormGroup;
    errorMessage: any;
    _intervalCount: number = 0;
    resPlanUserState: IResPlan[];
    fromDate: Date;
    toDate: Date;
    timescale: Timescale;
    workunits: WorkUnits;



    get resPlans(): FormArray {  //this getter should return all instances.
        return <FormArray>this.mainForm.get('resPlans');
    }

    @Output() onLoading = new EventEmitter<boolean>();
    loading = false

    load(val: boolean) {

        this.onLoading.emit(true)
        this.loading = true
    }




    constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator
        , private router: Router,
        private _resourcePlanSvc: ResourcePlanService
        , private _resPlanUserStateSvc: ResourcePlanUserStateService
        , private _resModalSvc: ResourcesModalCommunicatorService
        , private _appSvc: AppStateService
        , private _route: ActivatedRoute) { }

    ngOnInit(): void {
        debugger;

        this.mainForm = this.fb.group({
            resPlans: this.fb.array([])
        });
        let today = new Date();
        let todayDate = new Date(2017, 11, 31);
        let lastYearDate = new Date(2017, 0, 1);
        this.fromDate = this._route.snapshot.params["fromDate"] && new Date(this._route.snapshot.params["fromDate"]) || lastYearDate;
        this.toDate = this._route.snapshot.params["toDate"] && new Date(this._route.snapshot.params["toDate"]) || todayDate;
        this.timescale = this._route.snapshot.params["timescale"] || Timescale.calendarMonths;
        this.workunits = this._route.snapshot.params["workunits"] || WorkUnits.FTE;

        this._route.data.subscribe(values => {
            this.resPlanData = values.resPlans;
            //this.resPlans = values.resPlans;
            if (values.resPlans && values.resPlans.length > 0)
                this.setIntervalLength((<IResPlan[]>values.resPlans).map(t => t.projects).reduce((a, b) => a.concat(b)))
            this.buildResPlans(values.resPlans);
            //console.log(JSON.stringify(values.resPlans))
        }, (error) => console.log(error))
        this._modalSvc.modalSubmitted$.subscribe(() => {
            this.addSelectedProjects(this.fromDate, this.toDate, this.timescale, this.workunits);
        }, (error) => console.log(error))
        console.log("=========multi subscribe")
        this._resModalSvc.modalSubmitted$.subscribe(() => {

            this.addSelectedResources()

        }, (error) => console.log(error));
        this.modalResources.modalSubmitted$.subscribe(() => this._resModalSvc.modalSubmitClicked(), (error) => console.log(error));
        this.modalProjects.modalSubmitted$.subscribe(() => this._modalSvc.modalSubmitClicked(), (error) => console.log(error));
    }


    ngAfterViewChecked(): void {
        //console.log('ng after view checke fired.')
    }

    calculateTotals(fg: FormGroup): void {

        var value = fg.value;

        if (value.readOnly == true)
            return
        for (var i = 0; i < value["totals"].length; i++) {
            var sum = 0;
            for (var j = 0; j < value["projects"].length; j++) {
                if (value["projects"][j]["intervals"].length < 1)
                    continue;
                var val = parseFloat(value["projects"][j]["intervals"][i]["intervalValue"]);
                if (!val) {
                    val = 0.0;
                }
                sum += val;
            }
            value["totals"][i]['intervalValue'] = new IntervalPipe().transform(sum.toString(), this.workunits);
        }
        fg.setValue(value, { emitEvent: false });
        //console.log('Totals... ' + JSON.stringify(value) + "      stop....")

    }

    buildResPlans(plans: IResPlan[]) {
        debugger;
        //console.log('add resources ==========================================' + JSON.stringify(plans));
        for (var i = 0; i < plans.length; i++) {
            var resPlan = this.buildResPlan(plans[i]);
            this.resPlans.push(resPlan);
        }
    }

    buildResPlan(_resplan: IResPlan): FormGroup {
        var _totals = this.fb.array([]);
        var resPlanGroup = this.fb.group({
            resUid: _resplan.resource.resUid.toLowerCase(),
            resName: _resplan.resource.resName,
            totals: this.initTotals(_totals, _resplan.projects),
            projects: this.fb.array([]),
            selected: this.fb.control(false)
        });
        for (var i = 0; i < _resplan.projects.length; i++) {
            var project = this.buildProject(_resplan.projects[i]);
            (resPlanGroup.get('projects') as FormArray).push(project)
        }

        this.calculateTotals(resPlanGroup);
        resPlanGroup.valueChanges.subscribe(value => {
            this.calculateTotals(resPlanGroup)
        }, (error) => console.log(error));
        return resPlanGroup;
    }

    buildProject(_project: IProject) {
        var project = this.fb.group({
            projUid: _project.projUid,
            projName: _project.projName,
            readOnly: _project.readOnly,
            intervals: this.fb.array([]),
            selected: this.fb.control(false)
        });
        for (var i = 0; i < _project.intervals.length; i++) {
            var interval = this.buildInterval(_project.intervals[i]);
            (project.get('intervals') as FormArray).push(interval);
        }
        return project;
    }

    buildInterval(interval: IInterval): FormGroup {
        return this.fb.group({
            intervalName: interval.intervalName,
            intervalValue: new IntervalPipe().transform(interval.intervalValue, this.workunits)
        });
    }

    initTotals(totals: FormArray, _projects: IProject[]): FormArray {
        var intervalLen = this.getIntervalLength();
        for (var i = 0; i < intervalLen; i++) {

            var total = this.fb.group({
                intervalName: '',
                intervalValue: new IntervalPipe().transform('0', this.workunits)
            });
            totals.push(total);
        }
        return totals;
    }

    addResPlan(): void {
        this.resPlans.push(this.buildResPlan(new ResPlan()));
    }

    get foo(): FormGroup {
        return <FormGroup>this.resPlans.get('projects');
    }

    getIntervalLength() {
        //toDo... thinking about putting interval count in data service
        return this._intervalCount;
    }
    setIntervalLength(projects: IProject[]) {

        if (this._intervalCount < 1) {
            for (var j = 0; j < projects.length; j++) {
                if (projects[j].readOnly == false) {
                    this._intervalCount = projects[j].intervals.length;
                    return;
                }
            }
        }

    }

    toggleSelectAll(value: boolean) {
        debugger;
        this.resPlans.controls.forEach((_resPlan: FormGroup) => {
            _resPlan.controls['selected'].setValue(value, { emitEvent: false });
            (_resPlan.controls['projects'] as FormArray).controls.forEach(element => {
                (element as FormGroup).controls['selected'].setValue(value, { emitEvent: false })
            });
        });
    }
    toggleResPlanSelection(_resPlan: FormGroup, selected: boolean) {

        debugger;
        _resPlan.controls['selected'].setValue(selected, { emitEvent: false });
        (_resPlan.controls['projects'] as FormArray).controls.forEach(element => {
            (element as FormGroup).controls['selected'].setValue(selected, { emitEvent: false })
        });
    }
    DeselectGroupOnUncheck(_resPlan: FormGroup, value: boolean) {
        if (value == false) {
            _resPlan.controls['selected'].setValue(false, { emitEvent: false });
        }
    }
    addProject(_resPlan: FormGroup): void {
        //get IProjects[] array from current formgroup

        var data = _resPlan.value.resUid;
        this._modalSvc.projectsAssigned(_resPlan.value.projects);
        //console.log('projects in RP = ' + JSON.stringify(_resPlan.value.projects))
        this.modalProjects.showModal(data);
        var _projects: [IProject];
        var project = new Project();
        this.currentFormGroup = _resPlan;
    }

    addResources() {
        console.log("add resources fired");
        let resourcesSelected: IResource[] = this.resPlans.value.map(res => { return new Resource(res.resUid, res.resName) })
        //console.log('resources selected=' + JSON.stringify(resourcesSelected))

        this._resModalSvc.ResourcesSelected(resourcesSelected)
        this.modalResources.showModal('');
    }

    addSelectedResources() {
        debugger;
        //console.log("add resource fired" + JSON.stringify(this._resModalSvc.selectedResources));
        ///EMIT HERE
        let selectedResources = this._resModalSvc.selectedResources;
        this._appSvc.loading(true);
        this._resPlanUserStateSvc.getCurrentUserId().subscribe(resMgr => {
            debugger
            console.log('selected resources=' + JSON.stringify(this._resModalSvc.selectedResources))
            this._resPlanUserStateSvc.getResPlansFromResources(resMgr, this._resModalSvc.selectedResources, this.fromDate, this.toDate, this.timescale, this.workunits)
                .subscribe(plans => {
                    this._resPlanUserStateSvc.AddResourceToManager(resMgr, plans).subscribe(r => {
                        if (r.success == true) {
                            console.log('added resplans=' + JSON.stringify(plans))
                            this.setIntervalLength((<IResPlan[]>plans).map(t => t.projects).reduce((a, b) => a.concat(b)))
                            //filter resplan on the resource who got updated in SP list successfully
                            this.buildResPlans(plans)
                            this._resModalSvc.selectedResources = [];
                            this._appSvc.loading(false);
                        }
                        else {
                            this._resModalSvc.selectedResources = [];
                            this._appSvc.loading(false);
                        }
                    }, (error) => {
                        console.log(error); this._appSvc.loading(false);
                    })
                        , (error) => { console.log(error); this._appSvc.loading(false); }
                })
        }, (error) => { console.log(error); this._appSvc.loading(false); })
    }

    addSelectedProjects(fromDate: Date, toDate: Date, timescale: Timescale, workunits: WorkUnits) {
        this._appSvc.loading(true);
        this._resPlanUserStateSvc.getCurrentUserId().subscribe(resMgr => {
            let resource = new Resource(this.currentFormGroup.value["resUid"],
                this.currentFormGroup.value["resName"]);
            this._resPlanUserStateSvc.addProjects(resMgr, this._modalSvc.selectedProjects, resource,
                fromDate, toDate, timescale, workunits)
                .subscribe(results => {
                    //let projects = this._modalSvc.selectedProjects;
                    this._modalSvc.selectedProjects = [];
                    debugger;
                    let successfullProjects = results.filter(r=>r.success == true).map(t=>t.project);
                    //projects.filter(p => results.findIndex(r => r.success == true && r.project.projUid.toUpperCase() == p.projUid.toUpperCase()) > -1)
                    console.log("===added projects" + JSON.stringify(successfullProjects))

                        if (successfullProjects.length > 0) {
                            this.buildSelectedProjects(successfullProjects)//.filter(r=>r.projUid.toUpperCase))
                            debugger;
                            this.header.setIntervals([new ResPlan(resource,successfullProjects)]);
                            this._appSvc.loading(false);
                        }
                        else {
                            this._appSvc.loading(false);
                        }
                    
                })
        }, (error) => { console.log(error); this._appSvc.loading(false); })
    }
    worksunitsChanged(value: number) {
        debugger;
        this.workunits = value;
        this.ReloadPage();
    }
    timescaleChanged(value: number) {
        debugger;
        this.timescale = value;
        this.ReloadPage();
    }
    dateRangeChanged(value) {
        debugger

        this.fromDate = new Date(value.start._d)
        this.toDate = new Date(value.end._d)
        console.log(JSON.stringify(value))
        this.ReloadPage()
    }
    ReloadPage() {
        //console.log(this.fromDate.toDateString())
        var url = '/resPlans'
        let oldConfig = this.router.routeReuseStrategy.shouldReuseRoute;
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false };
        this.router.isActive = function () { return false; }
        //this.router.navigate(['/products/2', {name: randomNum}])
        this.router.navigate(['/resPlans',
            {
                fromDate: this.fromDate,
                toDate: this.toDate,
                timescale: this.timescale,
                workunits: this.workunits,

            }]
        ).then(function () {
            //this.router.routeReuseStrategy.shouldReuseRoute = oldConfig;
        });
    }
    populateTestData(): void {


    }

    buildSelectedProjects(projects: IProject[]): void {
        debugger;
        this.setIntervalLength(projects)
        var intervalLength = this.getIntervalLength();
        for (var k = 0; k < projects.length; k++) {
            let project: IProject = projects[k];
            // project.intervals = [];
            // for (var i = 0; i < intervalLength; i++) {
            //     project.intervals.push(new Interval('', '0.0'));
            // }

            (this.currentFormGroup.controls['projects'] as FormArray).push(this.buildProject(project));
        }
    }

    savePlans(fromDate: Date, toDate: Date, timescale: Timescale, workunits: WorkUnits): void {
        debugger;
        if (this.mainForm.dirty && this.mainForm.valid) {


            let resourceplans = this.fb.array(this.resPlans.controls
                .filter(item => item.dirty === true)).controls
                .map(t => {
                    var _resPlan: IResPlan;
                    var _projects: [IProject];
                    var projects = Object.assign([], _projects, this.fb.array(((t as FormGroup).controls['projects'] as FormArray).controls.filter(s => s.dirty == true)).value)
                    let resPlan = new ResPlan();
                    resPlan.resource = new Resource(t.value.resUid, t.value.resName);

                    resPlan.projects = projects;
                    return resPlan;
                })



            console.log("dirty resPlans" + JSON.stringify(resourceplans))
            this._appSvc.loading(true);
            this._resPlanUserStateSvc.saveResPlans(resourceplans, fromDate, toDate, timescale, workunits)
                .subscribe(
                (results: Result[]) => this.onSaveComplete(results),
                (error: any) => {
                    this.errorMessage = <any>error
                    this._appSvc.loading(false);
                });
        }
        //()
        else if (!this.mainForm.dirty) {
            //this.onSaveComplete();
        }
    }

    deleteResPlans(fromDate: Date, toDate: Date, timescale: Timescale, workunits: WorkUnits, hideOnly: boolean): void {
        debugger;
        if (this.mainForm.valid) {


            let resourceplans = this.fb.array(this.resPlans.controls
                .filter(item =>
                    (item.value.selected || item.value.projects.map(p => p.selected == true).length > 0) // res Plan marked for delete or atleast one project in ResPlan marked for delete
                )).controls
                .map(t => {
                    var _resPlan: IResPlan;
                    var _projects: [IProject];
                    var projects = Object.assign([], _projects, this.fb.array(((t as FormGroup).controls['projects'] as FormArray).controls.filter(s => s.value.selected == true)).value)
                    let resPlan = new ResPlan();
                    resPlan.resource = new Resource(t.value.resUid, t.value.resName);
                    resPlan.projects = projects;
                    resPlan["selected"] = (t as FormGroup).controls['selected'].value;
                    console.log(JSON.stringify(resPlan))
                    //resPlan["selected"] = _resPlan["selected"]
                    return resPlan;
                });



            console.log("dirty resPlans" + JSON.stringify(resourceplans))
            this._appSvc.loading(true);
            if (hideOnly == true) {
                this._resPlanUserStateSvc.getCurrentUserId().flatMap(resMgr => {
                    return this._resPlanUserStateSvc.HideResPlans(resMgr, resourceplans as IResPlan[]).map(r => {
                        this.deleteResourcePlans(r)
                        this._appSvc.loading(false);
                    },
                        (error: any) => {
                            this.errorMessage = <any>error
                            this._appSvc.loading(false);
                        }
                    )
                },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this._appSvc.loading(false);
                    }
                ).subscribe((r) => { 
                    this._appSvc.loading(false) 
                    
                }, () => { this._appSvc.loading(false) })
            }
            else {
                this._resPlanUserStateSvc.deleteResPlans(resourceplans, fromDate, toDate, timescale, workunits)
                    .flatMap(
                    (results: Result[]) => {
                        debugger;
                        return this._resPlanUserStateSvc.getCurrentUserId().flatMap(resMgr => {
                            resourceplans.forEach(resPlan => {
                                //if resource marked for selection check if all projects were successful by comparing count of projects prior to upadte and after
                                let projectsMarkedForDeleteCount = resPlan.projects.length;
                                
                                resPlan.projects = resPlan.projects.filter(function (p) { return results.findIndex(function (r) { return r.success == true && r.project.projUid.toUpperCase() == p.projUid.toUpperCase(); }) > -1; });
                                // if(resPlan["selected"] == true)
                                // {
                                //    resPlan["selected"] = (projectsMarkedForDeleteCount == resPlan.projects.length);
                                // }
                            });
                            
                            
                            return this._resPlanUserStateSvc.HideResPlans(resMgr, resourceplans as IResPlan[]).map(r => {
                                this.deleteResourcePlans(resourceplans)
                                this._appSvc.loading(false);
                            },
                                (error: any) => {
                                    this.errorMessage = <any>error
                                    this._appSvc.loading(false);
                                }
                            )
                        },
                            (error: any) => {
                                this.errorMessage = <any>error;
                                this._appSvc.loading(false);
                            }
                        )
                    }).subscribe(() => { this._appSvc.loading(false) }, () => { this._appSvc.loading(false) })
            }
        }
        //()
        else if (!this.mainForm.dirty) {
            //this.onSaveComplete();
        }

    }
    onSaveComplete(results: Result[]): void {
        // Reset the form to clear the flags
        //this.mainForm.reset();
        this._appSvc.loading(false);

    }

    deleteResourcePlans(resPlans: IResPlan[]) {
        debugger;
        resPlans.forEach(resPlan => {
            //entire res plan selected for delete
            if (resPlan["selected"] == true) {
                let resPlanCtrlIndex = this.resPlans.controls.findIndex(t => ((t as FormGroup).controls['resUid'].value as string).toUpperCase() == resPlan.resource.resUid.toUpperCase());
                this.resPlans.removeAt(resPlanCtrlIndex);
            }
            // one or more projects selected to delete
            else {
                let deletedProjectUids = resPlan.projects.filter(p => p["selected"] == true).map(p => p.projUid.toUpperCase())
                let resPlanCtrl = this.resPlans.controls.find(t => ((t as FormGroup).controls['resUid'].value as string).toUpperCase() == resPlan.resource.resUid.toUpperCase()) as FormGroup;
                // let allProjects = resPlanCtrl.value['projects'];
                // let newProjects = allProjects.filter(a=> deletedProjectUids.indexOf(a["projUid"]) > -1);
                deletedProjectUids.forEach(deletedProject => {
                    let index = (resPlanCtrl.controls['projects'] as FormArray).controls.findIndex(t => t.value.projUid.toUpperCase() == deletedProject.toUpperCase());
                    (resPlanCtrl.controls['projects'] as FormArray).removeAt(index);
                })

            }
        });
    }
}
