import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ResPlanService } from './resourcePlans/shared/resPlan.service'
import { ResPlanServiceHack } from './resourcePlans/shared/resPlanHack.service'
import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';

import {ResPlansHomeComponent} from './resourcePlans/res-plans-home.component'
import {ResPlanDetailsComponent} from './resourcePlans/res-plan-detail.component';

import {ResPlanDetails2Component} from './resourcePlans/res-plan-detail2.component';

import { CollapsibleWellComponent} from './common/collapsible-well.component'
import { HeaderRowComponent} from './common/header-row.component'
import { JQ_TOKEN }    from './common/jquery.service'

declare let jQuery : Object;





@NgModule({
  declarations: [
    AppComponent,

    ResPlansHomeComponent,
    ResPlanDetailsComponent,
    ResPlanDetails2Component,
    CollapsibleWellComponent,
    HeaderRowComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule
  ],
  providers: [ ResPlanServiceHack,  { provide: JQ_TOKEN, useValue: jQuery }],
  bootstrap: [AppComponent]
})
export class AppModule { }
