import { Routes } from '@angular/router'
import {ResPlanListComponent}  from './resourcePlans/res-plan-list.component'
import { FooComponent} from './resourcePlans/foo.component'
import { missionControlComponent} from './servicePOC/missionControl.component'
import { RxjsComponentComponent} from './resourcePlans/rxjs-component/rxjs-component.component'
import { Rxjs2 } from './resourcePlans/rxjs-component/rxjs-component.component2'

export const appRoutes : Routes = [
 
  { path: 'resPlans', component: ResPlanListComponent},
    { path: 'foo', component: FooComponent},

  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]