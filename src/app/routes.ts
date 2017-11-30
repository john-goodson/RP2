import { Routes } from '@angular/router'
import { ResPlanListComponent } from './resourcePlans/res-plan-list.component'
import {ResPlanHomeComponent} from './resourcePlans/res-plan-home/res-plan-home.component'
import { JumbotronComponent  } from './jumbotron/jumbotron.component'



import { ResourcePlansResolverService } from './services/resource-plans-resolver.service'

export const appRoutes: Routes = [

  {
    path: '',
    component: ResPlanHomeComponent,
    children: [
      { path: '', component: ResPlanListComponent },
    
      { path: 'resPlans/:**', component: ResPlanListComponent }, 
      { path: 'resPlans/:*', component: ResPlanListComponent }, 
      { path: 'jumbotron', component: JumbotronComponent},
      { path: '**', component: ResPlanListComponent }
      // { path: 'resPlans', component: ResPlanListComponent },
    ],
    resolve: {resPlans: ResourcePlansResolverService }
  }

  
  // { path: '', component: ResPlanHomeComponent },
  // { path: '**', component: ResPlanHomeComponent }


]