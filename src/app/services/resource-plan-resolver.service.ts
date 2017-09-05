import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IResPlan,IProject,IIntervals,ResPlan,Interval,Project } from '../resourcePlans/res-plan.model';
import { ResourcePlanService } from '../services/resource-plan.service'
import { ResourcePlanUserStateService} from '../services/resource-plan-user-state.service'


@Injectable()
export class ResourcePlanResolverService implements Resolve<IResPlan> {

  constructor(private _resPlanSvc: ResourcePlanService
    , private _resPlanUserStateSvc: ResourcePlanUserStateService
  , private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    debugger
    let resUid = route.params['resUid']
    this.router.navigate( ['/placeholder']) 
    

    return Observable.from(this.boo)


  }

  const boo =   [
    {
        "id": 1,
        "name": "John Goodson",
        "org": {
            "location": "Nashville",
            "title": "Cons Engr",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": 1,
                "name": "Data Center",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }
                ]
            }
          ]





}


