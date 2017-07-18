import { Component, Input, OnChanges } from '@angular/core';
import { IResPlan } from './res-plan.model';


@Component({
  selector: 'resplan-detail',
  templateUrl: './res-plan-detail.component.html',
  styles : [`.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}`]
})

export class ResPlanDetailsComponent  {
  @Input() resPlans: IResPlan[];
  @Input() filterBy: string;
  @Input() sortBy: string;

  //todo... add methods for sorting and filtering.

}





