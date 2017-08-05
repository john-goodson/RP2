import { Routes } from '@angular/router'
import {ResPlanListComponent}  from './resourcePlans/res-plan-list.component'





export const appRoutes : Routes = [
 
  { path: 'resPlans', component: ResPlanListComponent},

  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]