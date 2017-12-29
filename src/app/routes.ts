import { Routes } from '@angular/router'
import { ResPlanListComponent } from './resourcePlans/res-plan-list.component'
import {ResPlanHomeComponent} from './resourcePlans/res-plan-home/res-plan-home.component'
import { JumbotronComponent  } from './jumbotron/jumbotron.component'
import { DateRangePicker } from './common/dateRangePicker/dateRangePicker.component'



import { ResourcePlansResolverService } from './services/resource-plans-resolver.service'

export const appRoutes: Routes = [

 
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ResPlanHomeComponent, 
     children: [
        { path: '', redirectTo: 'resPlans', pathMatch: 'full'},
        { path: 'resPlans', component: ResPlanListComponent ,  resolve: {resPlans: ResourcePlansResolverService }
     },
        { path: 'customDates', component: DateRangePicker},
        { path: 'perview', redirectTo: "http://foo.wingtip.com/pwa" ,pathMatch: 'full'}
        // { path: 'resPlans', component: ResPlanListComponent },
      ]
}
]
    

  //{path:'',redirectTo:'resPlans',pathMatch:'full'}

  
  // { path: '', component: ResPlanHomeComponent },
  // { path: '**', component: ResPlanHomeComponent }


