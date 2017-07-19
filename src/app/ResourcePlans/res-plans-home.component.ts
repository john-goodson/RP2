import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { IResPlan } from  './res-plan.model'
import { ResPlanService } from './shared/resPlan.service'
import { ResPlanServiceHack}  from './shared/resPlanHack.service'



@Component({

  templateUrl: './res-plans-home.component.html',
  styles:[`.outer {position:relative}
.inner {
  overflow-x:auto;
  overflow-y:auto;
  margin-left:100px;
}
table {
  table-layout: fixed; 
  width: 100%;
  *margin-left: -100px;/*ie7*/
}
table.fixed {table-layout:fixed; }/*Setting the table width is important!*/
table.fixed td {overflow:hidden;}/*Hide text outside the cell.*/

`]
})
export class ResPlansHomeComponent implements OnInit {
  resPlans: IResPlan[]
  editMode: boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';
  errorMessage: string;

  constructor(private _resPlanSvc: ResPlanServiceHack, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this._resPlanSvc.getResPlans().subscribe(resPlans => this.resPlans = resPlans, 
      error => this.errorMessage = <any>error)
  }

  getIntervalCount()
  {
      if(this.resPlans && this.resPlans.length> 0 && this.resPlans[0].projects && this.resPlans[0].projects.length > 0 
      && this.resPlans[0].projects[0].intervals)
      {
          return this.resPlans[0].projects[0].intervals.length;
      }
      return 0;
  }  
}


