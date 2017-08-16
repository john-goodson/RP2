import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';
import {  ResPlanData } from './services/res-plan-data';

import {  ResPlanService} from './services/res-plan-service.service'
import { MockProjectService } from './services/mock-Project.service'
import { FooComponent} from './resourcePlans/foo.component'

import { MissionService} from './servicePOC/mission.service'
import {AstronautComponent} from './servicePOC/astronaut.component'
import { missionControlComponent } from './servicePOC/missionControl.component'
import { ModalCommunicator } from  './resourcePlans/modal-communicator.service'
import {ResPlanDetailsComponent} from './resourcePlans/res-plan-detail.component';

import {ResPlanDetails2Component} from './resourcePlans/res-plan-detail2.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CollapsibleWellComponent} from './common/collapsible-well.component'
import { HeaderRowComponent} from './common/header-row.component'
//import { JQ_TOKEN }    from './common/jquery.service'

import {  NestedFormArray } from './poc/formArray.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ResPlanListComponent} from './resourcePlans/res-plan-list.component'
import { SimpleModalComponent} from './common/simple-modal.component';
import { ProjectListComponent } from './resourcePlans/project-list/project-list.component'


//let jQuery : Object;

@NgModule({
  declarations: [
    AppComponent,
    ResPlanDetailsComponent,
    ResPlanDetails2Component,
    CollapsibleWellComponent,
    HeaderRowComponent,
    NestedFormArray,
    ResPlanListComponent, 
    FooComponent,
    SimpleModalComponent,
    ProjectListComponent,
    AstronautComponent,
    missionControlComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule, 
          ReactiveFormsModule ,
          InMemoryWebApiModule.forRoot(ResPlanData),
          
  ],
  
  providers: [ ResPlanService, MockProjectService, MissionService, ModalCommunicator ],
  bootstrap: [AppComponent]
})
export class AppModule { }
