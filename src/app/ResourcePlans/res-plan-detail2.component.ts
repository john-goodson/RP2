import { Component, Input, OnChanges } from '@angular/core';
import { IResPlan } from './res-plan.model';


@Component({
  selector: 'resplan-detail2',
  templateUrl: './res-plan-detail2.component.html',
  styles : [`*
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
.col1, .col3, .col4, .col5
{
    width:220px;
    min-width: 220px;
}
.col2
{
    min-width: 300px;
}`]
})

export class ResPlanDetails2Component  {
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





