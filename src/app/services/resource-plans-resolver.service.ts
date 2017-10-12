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
    debugger;
    let today = new Date();
    let todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let lastYearDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    let fromDate = route.queryParams["fromDate"] && new Date(route.queryParams["fromDate"]) || lastYearDate;
    let toDate = route.queryParams["toDate"] && new Date(route.queryParams["toDate"]) || todayDate;
    let timescale = route.queryParams["timescale"] || Timescale.calendarMonths;
    let workunits = route.queryParams["workunits"] || WorkUnits.days;

    return this._resPlanUserStateSvc.getResPlans(fromDate, toDate, timescale, workunits)
      .map(resPlans => {
        if (resPlans) {
          console.log('Resplans from resolver: ')
          return resPlans
        }
      })

  }
}