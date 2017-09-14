import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
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

import {  DataTableDemo3 } from './common/demo3/data-table-demo3'
import { DataTableModule } from 'angular-4-data-table';
import { ResourcePlansResolverService } from './services/resource-plans-resolver.service';
import { ResourceListComponent } from './ResourcePlans/resource-list/resource-list.component'
import { SPListService } from './services/sp-list.service'
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
    DataTableDemo3,
    ResourceListComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule, 
          ReactiveFormsModule ,
          DataTableModule,
          HttpClientModule,
         // InMemoryWebApiModule.forRoot(ResPlanData),
          
  ],
  
  providers: [ ResPlanService,   ModalCommunicator, ResourcesModalCommunicatorService,ProjectService, ResourcePlanService
    , ResourcePlanUserStateService
    , ResourcePlansResolverService
    ,ResourceService, SPListService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
