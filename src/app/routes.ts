import { Routes } from '@angular/router'
import { ResPlanSummaryComponent }  from './resourcePlans/res-plan-summary.component'



export const appRoutes : Routes = [
 
  { path: 'resPlans', component: ResPlanSummaryComponent},

  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]