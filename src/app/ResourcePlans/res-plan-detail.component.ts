import { Component, Input, OnChanges } from '@angular/core';
import { IResPlan } from './res-plan.model';


@Component({
  selector: 'resplan-detail',
  templateUrl: './res-plan-detail.component.html',
  styles: ['collapsible-well h6 {margin-top:-5px; margin-bottom:10px }'
  ],
})

export class ResPlanDetailsComponent  {
  @Input() resPlan: IResPlan;
  @Input() filterBy: string;
  @Input() sortBy: string;

  //todo... add methods for sorting and filtering.

}





