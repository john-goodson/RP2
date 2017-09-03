import { Pipe, PipeTransform } from '@angular/core';
import {IProject,IResPlan} from "../ResourcePlans/res-plan.model"
import { FormGroup,FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';
@Pipe({
  name: 'projectListFilter'
})
export class ProjectListFilterPipe implements PipeTransform {

  transform(projects: FormControl[],resPlan:FormGroup): FormControl[] {
    debugger;
       let array1 = ['how', 'now', 'brown', 'cow']
    let array2 = ['how','cow', 'foo','boo']
    //let result = array1.filter((n) => array2.includes(n))  //this is an intersect
    //let boo = array1.filter(result)
     projects = projects.filter(val => {
       
       if(resPlan.value.projects.map(t=>t.id.toUpperCase()).indexOf(val.value.id.toUpperCase())< 0)
       return val;
    })
      debugger;
      return projects;
      
    }
}

