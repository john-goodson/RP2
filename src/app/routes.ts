import { Routes } from '@angular/router'
import {ResPlanListComponent}  from './resourcePlans/res-plan-list.component'
import { FooComponent} from './resourcePlans/foo.component'
import { missionControlComponent} from './servicePOC/missionControl.component'





export const appRoutes : Routes = [
 
  { path: 'resPlans', component: ResPlanListComponent},
    { path: 'foo', component: FooComponent},

  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]