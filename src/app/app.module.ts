import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';

import {  ResPlanService} from './services/res-plan-service.service'

import { FooComponent} from './resourcePlans/foo.component'


import { ModalCommunicator } from  './resourcePlans/modal-communicator.service'
import { ResourcesModalCommunicatorService } from  './resourcePlans/resources-modal-communicator.service'

import {ResPlanDetailsComponent} from './resourcePlans/res-plan-detail.component';

import {ResPlanDetails2Component} from './resourcePlans/res-plan-detail2.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CollapsibleWellComponent} from './common/collapsible-well.component'
import { HeaderRowComponent} from './common/header-row.component'
//import { JQ_TOKEN }    from './common/jquery.service'


import { ReactiveFormsModule } from '@angular/forms'
import { ResPlanListComponent} from './resourcePlans/res-plan-list.component'
import { SimpleModalComponent} from './common/simple-modal.component';
import { ProjectListComponent } from './resourcePlans/project-list/project-list.component';
import { RxjsComponentComponent } from './resourcePlans/rxjs-component/rxjs-component.component'
import { Rxjs2 } from './resourcePlans/rxjs-component/rxjs-component.component2'

import {ProjectService} from './services/project-service.service'
import { ResourcePlanService } from './services/resource-plan.service'
import {ResourcePlanUserStateService} from './services/resource-plan-user-state.service';
import {ResourceService} from './services/resource.service'
import { ProjectListFilterPipe } from './common/project-list-filter.pipe'
import { ResourcePlansResolverService } from './services/resource-plans-resolver.service';
import { ResourceListComponent } from './ResourcePlans/resource-list/resource-list.component'
//let jQuery : Object;

@NgModule({
  declarations: [
    AppComponent,
    ResPlanDetailsComponent,
    ResPlanDetails2Component,
    CollapsibleWellComponent,
    HeaderRowComponent,
    ResPlanListComponent, 
    FooComponent,
    SimpleModalComponent,
    ProjectListComponent,
    RxjsComponentComponent,
    Rxjs2,
    ProjectListFilterPipe,
    ResourceListComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule, 
          ReactiveFormsModule ,
         // InMemoryWebApiModule.forRoot(ResPlanData),
          
  ],
  
  providers: [ ResPlanService,   ModalCommunicator, ResourcesModalCommunicatorService,ProjectService, ResourcePlanService
    , ResourcePlanUserStateService
    , ResourcePlansResolverService,ResourceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
