import { Component, OnInit,Input } from '@angular/core';
import {IResPlan} from '../../resourcePlans/res-plan.model';

@Component({
  selector: 'app-res-plan-header-row',
  templateUrl: './res-plan-header-row.component.html',
  styleUrls: ['./res-plan-header-row.component.css']
})
export class ResPlanHeaderRowComponent implements OnInit {
visible: boolean = true;
  @Input() _resPlans: IResPlan[];

  

  constructor() { }

  ngOnInit() {
  }

}
