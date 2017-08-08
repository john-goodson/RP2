import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import { IResPlan } from './res-plan.model'
import { IProject } from './res-plan.model'
import { IIntervals } from './res-plan.model'
import { ActivatedRoute, Router  } from '@angular/router';


import { ResPlanService } from '../services/res-plan-service.service';
import { ResPlan , Project, Interval} from './res-plan.model';
///hey can you hear me??
//hmm


@Component({
    selector: 'my-resplan',
    templateUrl: './res-plan-list.component.html'
})
export class ResPlanListComponent implements OnInit {

    mainForm: FormGroup;
    resPlanData: IResPlan[];
    errorMessage: any; 
 

    constructor(private fb: FormBuilder, private _resPlanSvc: ResPlanService,  private router: Router) { }

    ngOnInit(): void {

        this.mainForm = this.fb.group({
            resPlans: this.fb.array([])
        });
        this._resPlanSvc.getResPlans().subscribe(resPlanData => this.buildResPlans(resPlanData),
            error => console.log('error'));

        console.log('from service: ' + JSON.stringify(this.resPlanData));
        //debugger;
    }


    calculateTotals(fg: FormGroup): void {

        var value = fg.value;
        debugger;
        for (var i = 0; i < value["totals"].length; i++) {
            var sum = 0;
            for (var j = 0; j < value["projects"].length; j++) {
                sum += +(value["projects"][j]["intervals"][i]["intervalValue"]);
            }
            value["totals"][i]['intervalValue'] = sum;
        }
        fg.setValue(value, { emitEvent: false });
        console.log('Totals... ' + JSON.stringify(value) + "      stop....")

    }

    buildResPlans(_resPlans: IResPlan[]) {
        debugger;
        for (var i = 0; i < _resPlans.length; i++) {
            var resPlan = this.buildResPlan(_resPlans[i]);
            this.resPlans.push(resPlan);
        }
    }

    getIntervalLength(_projects: IProject[]): number {


        for (var i = 0; i < _projects.length; i++) {
            if (_projects[i].intervals.length > 0) {
                return _projects[i].intervals.length;
            }
        }
        return 0;
    }


    buildResPlan(_resplan: IResPlan): FormGroup {
        var _totals = this.fb.array([]);
        var resPlanGroup = this.fb.group({
            id: _resplan.id,
            name: _resplan.name,
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
            id: _project.id,
            name: _project.name,
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
        var intervalLen = this.getIntervalLength(_projects);
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
        //this.resPlans.push(this.buildResPlans());
    }

    get foo(): FormGroup {
        return <FormGroup>this.resPlans.get('projects');
    }

    get resPlans(): FormArray {  //this getter should return all instances.
        return <FormArray>this.mainForm.get('resPlans');
    }

    get projects(): FormArray {  //this getter should return all instances.
        return <FormArray>this.mainForm.get['projects'];
    }

    addProject(_resPlan: FormGroup): void {
        //get IProjects[] array from current formgroup
        var _projects : [IProject];
          var project = new Project();
          debugger;
       let p = Object.assign([], _projects, _resPlan.controls.projects.value);
        var intervalLength = this.getIntervalLength(p);
        
        for (var i = 0; i < intervalLength; i++) {
            project.intervals.push(new Interval('','0.0'));
        }
        ((_resPlan as FormGroup).controls['projects'] as FormArray).push(this.buildProject(project));    
    }

    populateTestData(): void {

        debugger;
    }

    savePlans(): void {
        debugger;
        if (this.mainForm.dirty && this.mainForm.valid) {
             var _resPlans : [IResPlan];
          
             let r = Object.assign([], _resPlans, this.fb.array(this.resPlans.controls
                .filter(item => item.dirty === true)).value);
             this._resPlanSvc.saveResPlans(r)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } 
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
