import { Routes } from '@angular/router'
import { ResPlanListComponent } from './resourcePlans/res-plan-list.component'
import {ResPlanHomeComponent} from './resourcePlans/res-plan-home/res-plan-home.component'



import { ResourcePlansResolverService } from './services/resource-plans-resolver.service'

export const appRoutes: Routes = [

  {
    path: 'resPlans'
    , component: ResPlanHomeComponent
    //npm start
    , resolve: {resPlans: ResourcePlansResolverService }
  },
  // {
  //   path: 'resPlansWithQuery'
  //   , component: ResPlanHomeComponent
  //   //npm start
  //   , resolve: {resPlans: ResourcePlansResolverService }
  // },
  

  
  
  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]