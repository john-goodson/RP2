import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IResPlan, IProject, IIntervals, ResPlan, Interval, Project } from '../resourcePlans/res-plan.model';
import { ResourcePlanService } from '../services/resource-plan.service'
import { ResourcePlanUserStateService } from '../services/resource-plan-user-state.service'

@Injectable()
export class ResourcePlansResolverService implements Resolve<IResPlan[]> {
  boo: any[]

  constructor(private _resPlanSvc: ResourcePlanService
    , private _resPlanUserStateSvc: ResourcePlanUserStateService
    , private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResPlan[]> {

    debugger   //Observable<IResPlan[]
    // let resUid = route.params['resUid']
    // this.router.navigate(['/placeholder'])
  
    return this._resPlanUserStateSvc.getResPlans()
      .map(resPlans => {
        if (resPlans) {
          console.log('Resplans from resolver: ' ) 
          return resPlans
        }
      })

  }
}