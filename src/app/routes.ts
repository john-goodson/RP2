import { Routes } from '@angular/router'
import { ResPlanListComponent } from './resourcePlans/res-plan-list.component'



import { ResourcePlansResolverService } from './services/resource-plans-resolver.service'

export const appRoutes: Routes = [

  {
    path: 'resPlans'
    , component: ResPlanListComponent
    , resolve: {resPlans: ResourcePlansResolverService }
  },
  

  { path: '', redirectTo: '/resPlans', pathMatch: 'full' }

]