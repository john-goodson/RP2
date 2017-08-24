import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';

import {  ResPlanService} from './services/res-plan-service.service'

import { FooComponent} from './resourcePlans/foo.component'


import { ModalCommunicator } from  './resourcePlans/modal-communicator.service'
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
    
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule, 
          ReactiveFormsModule ,
         // InMemoryWebApiModule.forRoot(ResPlanData),
          
  ],
  
  providers: [ ResPlanService,   ModalCommunicator, ProjectService, ResourcePlanService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
