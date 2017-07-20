import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { IResPlan } from  './res-plan.model'
import { ResPlanService } from './shared/resPlan.service'
import { ResPlanServiceHack}  from './shared/resPlanHack.service'



@Component({

  templateUrl: './res-plans-home.component.html',
  styles:[`.outer-container
{
    background-color: #ccc;
    position: absolute;
    top:0;
    left: 0;
    right: 0px;
    bottom: 40px;
}

.inner-container
{
    height: 100%;
    overflow: hidden;
    width:300px;
}

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


