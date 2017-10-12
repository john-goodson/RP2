import { Component, OnInit, Inject, DoCheck, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';

import { IResPlan, IProject, IInterval, ProjectActiveStatus, IResource, Resource, Timescale, WorkUnits } from './res-plan.model'

import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ResPlan, Project, Interval } from './res-plan.model';
import { SimpleModalComponent } from '../common/simple-modal.component'
import { ModalCommunicator } from '../resourcePlans/modal-communicator.service';
import { ProjectService } from '../services/project-service.service'
import { ResourcePlanService } from '../services/resource-plan.service'
import { ResourcePlanUserStateService } from '../services/resource-plan-user-state.service'
import { ResourcesModalCommunicatorService } from '../resourcePlans/resources-modal-communicator.service'

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




    constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator
        , private router: Router,
        private _resourcePlanSvc: ResourcePlanService
        , private _resPlanUserStateSvc: ResourcePlanUserStateService
        , private _resModalSvc: ResourcesModalCommunicatorService
        , private _route: ActivatedRoute) { }

    ngOnInit(): void {
        debugger;
        this.mainForm = this.fb.group({
            resPlans: this.fb.array([])
        });
        let today = new Date();
        let todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let lastYearDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        this.fromDate = this._route.params["fromDate"] && new Date(this._route.params["fromDate"]) || lastYearDate;
        this.toDate = this._route.params["toDate"] && new Date(this._route.params["toDate"]) || todayDate;
        this.timescale = this._route.params["timescale"] || Timescale.calendarMonths;
        this.workunits = this._route.params["workunits"] || WorkUnits.days;
        
        this._route.data.subscribe(values => {
            this.resPlanData = values.resPlans;
            //this.resPlans = values.resPlans;
            if (values.resPlans && values.resPlans.length > 0)
                this.setIntervalLength((<IResPlan[]>values.resPlans).map(t => t.projects).reduce((a, b) => a.concat(b)))
            this.buildResPlans(values.resPlans);
            //console.log(JSON.stringify(values.resPlans))
        }, (error) => console.log(error))
        this._modalSvc.modalSubmitted$.subscribe(() => {
            this.addSelectedProjects();
        }, (error) => console.log(error))
        this._resModalSvc.modalSubmitted$.subscribe(() => {
            debugger;
            this.addSelectedResources()
        }, (error) => console.log(error));
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
            value["totals"][i]['intervalValue'] = sum;
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
        });
        for (var i = 0; i < _resplan.projects.length; i++) {
            var project = this.buildProject(_resplan.projects[i]);
            (resPlanGroup.get('projects') as FormArray).push(project)
        }

        this.calculateTotals(resPlanGroup);
        resPlanGroup.valueChanges.subscribe(value => this.calculateTotals(resPlanGroup), (error) => console.log(error));
        return resPlanGroup;
    }

    buildProject(_project: IProject) {
        var project = this.fb.group({
            projUid: _project.projUid,
            projName: _project.projName,
            readOnly: _project.readOnly,
            intervals: this.fb.array([])
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
            intervalValue: interval.intervalValue
        });
    }

    initTotals(totals: FormArray, _projects: IProject[]): FormArray {
        var intervalLen = this.getIntervalLength();
        for (var i = 0; i < intervalLen; i++) {

            var total = this.fb.group({
                intervalName: '',
                intervalValue: '0'
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

    addProject(_resPlan: FormGroup): void {
        //get IProjects[] array from current formgroup
        this.modalProjects.modalSubmitted$.subscribe(() => this._modalSvc.modalSubmitClicked(), (error) => console.log(error));
        var data = _resPlan.value.resUid;
        this._modalSvc.projectsAssigned(_resPlan.value.projects);
        //console.log('projects in RP = ' + JSON.stringify(_resPlan.value.projects))
        this.modalProjects.showModal(data);
        var _projects: [IProject];
        var project = new Project();
        this.currentFormGroup = _resPlan;
    }

    addResources() {

        let resourcesSelected: IResource[] = this.resPlans.value.map(res => { return new Resource(res.resUid, res.resName) })
        //console.log('resources selected=' + JSON.stringify(resourcesSelected))
        this._resModalSvc.ResourcesSelected(resourcesSelected)
        this.modalResources.modalSubmitted$.subscribe(() => this._resModalSvc.modalSubmitClicked(), (error) => console.log(error));
        this.modalResources.showModal('');
    }

    addSelectedResources() {
        debugger;
        //console.log("add resource fired" + JSON.stringify(this._resModalSvc.selectedResources));
        let selectedResources = this._resModalSvc.selectedResources;
        this._resPlanUserStateSvc.getResPlansFromResources(this._resModalSvc.selectedResources, this.fromDate, this.toDate, this.timescale, this.workunits)
            .subscribe(plans => {
                //console.log("=======================added rp=" + JSON.stringify(plans))
                this.setIntervalLength((<IResPlan[]>plans).map(t => t.projects).reduce((a, b) => a.concat(b)))
                this.buildResPlans(plans)
            }, (error) => console.log(error));
    }

    addSelectedProjects() {
        //console.log("current=" + JSON.stringify(this.currentFormGroup.value))
        this._resPlanUserStateSvc.addProjects(this._modalSvc.selectedProjects, new Resource(this.currentFormGroup.value["resUid"], this.currentFormGroup.value["resName"]),
            '2017-05-01', '2017-08-01', Timescale.calendarMonths, WorkUnits.days)
            .subscribe(projects => {
                debugger;
                //console.log("===added projects" + JSON.stringify(projects))
                if (projects)
                    this.buildSelectedProjects(projects)
            })
    }

    timescaleChanged(value) {
        debugger;
        this.timescale = value;
        //console.log(this.fromDate.toDateString())
        var url = '/resPlans'
         let oldConfig = this.router.routeReuseStrategy.shouldReuseRoute;
        this.router.routeReuseStrategy.shouldReuseRoute = function(){return false};
        this.router.isActive = function() {return false;}
        //this.router.navigate(['/products/2', {name: randomNum}])
        this.router.navigate(['/resPlans',
        {
                    fromDate: this.fromDate,
                    toDate: this.toDate,
                    timescale: this.timescale,
                    workunits: this.workunits,
              
            }]
    ).then(function(){
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
            var project: IProject = projects[k];
            project.intervals = [];
            for (var i = 0; i < intervalLength; i++) {
                project.intervals.push(new Interval('', '0.0'));
            }

            (this.currentFormGroup.controls['projects'] as FormArray).push(this.buildProject(project));
        }
    }

    savePlans(): void {
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
            this._resPlanUserStateSvc.saveResPlans(resourceplans, '2017-05-01', '2017-08-01', Timescale.calendarMonths, WorkUnits.days)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        }
        //()
        else if (!this.mainForm.dirty) {
            this.onSaveComplete();
        }
    }
    onSaveComplete(): void {
        // Reset the form to clear the flags
        //this.mainForm.reset();
        this.router.navigate(['/foo']);

    }


}
