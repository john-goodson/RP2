import { Component, OnInit, Inject, DoCheck, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';

import { IResPlan, IProject, IIntervals, ProjectActiveStatus } from './res-plan.model'

import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { ResPlanService } from '../services/res-plan-service.service';
import { ResPlan, Project, Interval } from './res-plan.model';
import { SimpleModalComponent } from '../common/simple-modal.component'
import { ModalCommunicator } from '../resourcePlans/modal-communicator.service';
import { ProjectService } from '../services/project-service.service'
import { ResourcePlanService } from '../services/resource-plan.service'
import { ResourcePlanUserStateService} from '../services/resource-plan-user-state.service'

@Component({
    //selector: 'my-resplan',
    templateUrl: './res-plan-list.component.html'
})

export class ResPlanListComponent implements OnInit {

    @ViewChild(SimpleModalComponent)  //we need to call methods on modal
    private modalComponent: SimpleModalComponent;


    mainForm: FormGroup;
    resPlanData: IResPlan[]=[];
    projData: IProject[];
    currentFormGroup: FormGroup;
    errorMessage: any;
    _intervalCount: number = 3; //todo refactor this.
     resPlanUserState : IResPlan[];

    get resPlans(): FormArray {  //this getter should return all instances.
        return <FormArray>this.mainForm.get('resPlans');
    }
    // get projects(): FormArray {  //this getter should return all instances.
    //     return <FormArray>this.mainForm.get['projects'];
    // }

    constructor(private fb: FormBuilder, private _resPlanSvc: ResPlanService, private _modalSvc: ModalCommunicator
        , private router: Router, 
         private _resourcePlanSvc: ResourcePlanService
        , private _resPlanUserStateSvc: ResourcePlanUserStateService
        , private _route: ActivatedRoute ) { }

    ngOnInit(): void {
             this.mainForm = this.fb.group({
                resPlans: this.fb.array([])
            });
        this._route.data.subscribe( values=> this.buildResPlans(values.resPlans))
        this._modalSvc.modalSubmitted$.subscribe(()=>this.buildSelectedProjects(this._modalSvc.projectArray))
        }

        

    ngAfterViewChecked(): void {
            //console.log('ng after view checke fired.')
        }

    calculateTotals(fg: FormGroup): void {

            var value = fg.value;
            //debugger;
            for (var i = 0; i < value["totals"].length; i++) {
                var sum = 0;
                for (var j = 0; j < value["projects"].length; j++) {
                    var val = parseFloat(value["projects"][j]["intervals"][i]["intervalValue"]);
                    if(!val)
                        {
                            val  = 0.0;
                        } 
                    sum += val;
                }
                value["totals"][i]['intervalValue'] = sum;
            }
            fg.setValue(value, { emitEvent: false });
            //console.log('Totals... ' + JSON.stringify(value) + "      stop....")

        }

    buildResPlans(plans: IResPlan[]) {
            for (var i = 0; i < plans.length; i++) {
                var resPlan = this.buildResPlan(plans[i]);
                this.resPlans.push(resPlan);
            }
        }

    buildResPlan(_resplan: IResPlan): FormGroup {
            var _totals = this.fb.array([]);
            var resPlanGroup = this.fb.group({
                resUid: _resplan.resUid,
                resName: _resplan.resName,
                totals: this.initTotals(_totals, _resplan.projects),
                projects: this.fb.array([]),
            });
            for (var i = 0; i < _resplan.projects.length; i++) {
                var project = this.buildProject(_resplan.projects[i]);
                (resPlanGroup.get('projects') as FormArray).push(project)
            }

            this.calculateTotals(resPlanGroup);
            resPlanGroup.valueChanges.subscribe(value => this.calculateTotals(resPlanGroup));
            return resPlanGroup;
        }

    buildProject(_project: IProject) {
            var project = this.fb.group({
                projUid: _project.projUid,
                projName: _project.projName,
                intervals: this.fb.array([])
            });
            for (var i = 0; i < _project.intervals.length; i++) {
                var interval = this.buildInterval(_project.intervals[i]);
                (project.get('intervals') as FormArray).push(interval);
            }
            return project;
        }

    buildInterval(interval: IIntervals): FormGroup {
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

    addProject(_resPlan: FormGroup): void {
            //get IProjects[] array from current formgroup
            var data = _resPlan.value.resUid;
            debugger;
            this._modalSvc.projectsAssigned(_resPlan.value.projects);
            console.log('projects in RP = ' + JSON.stringify(_resPlan.value.projects))
            this.modalComponent.showModal(data);
            var _projects: [IProject];
            var project = new Project();
            this.currentFormGroup = _resPlan;



            // for (var i = 0; i < intervalLength; i++) {
            //     project.intervals.push(new Interval('', '0.0'));
            // }
            // ((_resPlan as FormGroup).controls['projects'] as FormArray).push(this.buildProject(project));
        }

    populateTestData(): void {

            
        }

    buildSelectedProjects( projects: IProject[]): void {
            debugger;
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
            //debugger;
            if (this.mainForm.dirty && this.mainForm.valid) {
                var _resPlans: [IResPlan];

                let r = Object.assign([], _resPlans, this.fb.array(this.resPlans.controls
                    .filter(item => item.dirty === true)).value);
                this._resPlanSvc.saveResPlans(r)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
            //
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
