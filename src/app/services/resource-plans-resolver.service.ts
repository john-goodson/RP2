import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IResPlan, IProject, IInterval, ResPlan, Interval, Project, Timescale, WorkUnits } from '../resourcePlans/res-plan.model';
import { ResourcePlanService } from '../services/resource-plan.service'
import { ResourcePlanUserStateService } from '../services/resource-plan-user-state.service'

@Injectable()
export class ResourcePlansResolverService implements Resolve<IResPlan[]> {
  boo: any[]

  constructor(private _resPlanSvc: ResourcePlanService
    , private _resPlanUserStateSvc: ResourcePlanUserStateService
    , private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResPlan[]> {
   console.log("resolver fired with route = " + JSON.stringify(route.params))
    let today = new Date();
    let todayDate = new Date(2017,11, 31);
    let lastYearDate = new Date(2017, 0, 1);
    //
    let fromDate = route.params["fromDate"] && new Date(route.params["fromDate"]) || lastYearDate;
    let toDate = route.params["toDate"] && new Date(route.params["toDate"]) || todayDate;
    let timescale = route.params["timescale"] || Timescale.calendarMonths;
    let workunits = route.params["workunits"] || WorkUnits.FTE;

    return this._resPlanUserStateSvc.getCurrentUserId().flatMap(resMgr=>{
    return this._resPlanUserStateSvc.getResPlans(resMgr,fromDate, toDate, timescale, workunits)
      .map(resPlans => {
        if (resPlans) {
          console.log('Resplans from resolver: ')
          return resPlans
        }
      })
    })

  }
}