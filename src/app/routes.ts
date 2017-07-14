import { Routes } from '@angular/router'
import { ResPlansHomeComponent }  from './resourcePlans/res-plans-home.component'



export const appRoutes : Routes = [
 
  { path: 'resPlans', component: ResPlansHomeComponent},

  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]