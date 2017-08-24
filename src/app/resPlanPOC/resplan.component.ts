import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';
import { ResPlanServiceHack } from './resplan.service'
import 'rxjs/add/operator/debounceTime';
import { IResPlan} from './res-plan.model'


import { ResPlan } from './resplan';


@Component({
    selector: 'my-resplan',
    templateUrl: './app/resplan/resplan.component.html'
})
export class ResPlanComponent implements OnInit {

    mainForm: FormGroup;
    resPlanData: IResPlan[];



    constructor(private fb: FormBuilder, private _resPlanSvc: ResPlanServiceHack) { }

    ngOnInit(): void {

        this.mainForm = this.fb.group({
            resPlans: this.fb.array([this.buildResPlans()])
        });
        this._resPlanSvc.getResPlans().subscribe(resPlanData => this.resPlanData = resPlanData, 
      error => console.log('error'));

      console.log(JSON.stringify(this.resPlanData));
    }

    calculateTotals(fg: FormGroup): void {
        
        var value = fg.value;
        for (var i = 0; i < value["totals"].length; i++) {
            var sum = 0;
            for (var j = 0; j < value["projects"].length; j++) {
                sum += +(value["projects"][j]["intervals"][i]["intervalValue"]);
            } 
            value["totals"][i]['intervalValue'] = sum;
        }
        fg.setValue(value, { emitEvent: false});
        console.log('Totals... ' + JSON.stringify(value) + "      stop...." )
        
    }

     buildResPlans(): FormGroup {
        var resPlanGroup =  this.fb.group({
            firstName: 'John', 
            totals: this.fb.array([this.buildTotals()]),
            projects: this.fb.array([this.buildProjects()]),
        });
        
        resPlanGroup.valueChanges.subscribe(value => this.calculateTotals(resPlanGroup)); 
        return resPlanGroup;
    }

    buildProjects(): FormGroup {
        return this.fb.group({
            projName: 'project xyz',
            intervals: this.fb.array([this.buildIntervals()])
        });
    }

    buildIntervals(): FormGroup {
        return this.fb.group({
            intervalName: 'jan',
            intervalValue: '33'
        });
    }

    buildTotals(): FormGroup {
        return this.fb.group({
            intervalName: 'jan',
            intervalValue: '33'
        });
    }

    addResPlan(): void {
        this.resPlans.push(this.buildResPlans());
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


    addProject(i: number): void {
        //this.mainForm.find('projects').push(this.buildProjects());
        (<FormArray>this.resPlans.at(i).get('projects')).push(this.buildProjects());
        console.log("passed in value: " + i);
    }

   
    populateTestData(): void {

         
    }

    save(): void {
        debugger
        console.log('Saved: ' + JSON.stringify(this.mainForm.value));
    }

}
