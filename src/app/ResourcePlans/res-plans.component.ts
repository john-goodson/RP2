import { Component, Input, OnChanges } from '@angular/core';
import { IProject } from './res-plan.model';


@Component({
  selector: 'project-list',
  templateUrl: './res-plans.component.html',
  styles: ['collapsible-well h6 {margin-top:-5px; margin-bottom:10px }'],
})

export class ResPlanListComponent  {
  @Input() projects: IProject[];
  @Input() filterBy: string;
  @Input() sortBy: string;

  //todo... add methods for sorting and filtering.

}





