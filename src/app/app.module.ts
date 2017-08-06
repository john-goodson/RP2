import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';
import {  ResPlanData } from './services/res-plan-data';
import {  ResPlanService} from './services/res-plan-service.service'


import {ResPlanDetailsComponent} from './resourcePlans/res-plan-detail.component';

import {ResPlanDetails2Component} from './resourcePlans/res-plan-detail2.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CollapsibleWellComponent} from './common/collapsible-well.component'
import { HeaderRowComponent} from './common/header-row.component'
import { JQ_TOKEN }    from './common/jquery.service'
import {  NestedFormArray } from './poc/formArray.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ResPlanListComponent} from './resourcePlans/res-plan-list.component'

declare let jQuery : Object;

@NgModule({
  declarations: [
    AppComponent,
    ResPlanDetailsComponent,
    ResPlanDetails2Component,
    CollapsibleWellComponent,
    HeaderRowComponent,
    NestedFormArray,
    ResPlanListComponent, 
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule, 
          ReactiveFormsModule ,
          InMemoryWebApiModule.forRoot(ResPlanData),
  ],
  providers: [ ResPlanService,  { provide: JQ_TOKEN, useValue: jQuery }],
  bootstrap: [AppComponent]
})
export class AppModule { }
