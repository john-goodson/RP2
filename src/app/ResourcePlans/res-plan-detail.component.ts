import { Component, Input, OnChanges } from '@angular/core';
import { IResPlan } from './res-plan.model';


@Component({
  selector: 'resplan-detail',
  templateUrl: './res-plan-detail.component.html',
  styles : [`
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
  .table-body
{
    overflow: auto;
    display-inline-block;
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

export class ResPlanDetailsComponent  {
  @Input() resPlans: IResPlan[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  foo: number = 0;

  //editMode: boolean = false;

  sumRows(resPlan, index) {
   var sum = 0;
   for(var j=0;j<resPlan.projects.length;j++)
   {
     sum+= +(resPlan.projects[j].intervals[index].intervalValue);
   }
    return sum;
 }
  
  


}





