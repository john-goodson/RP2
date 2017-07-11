import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResPlanSummaryComponent } from './resourcePlans/res-plan-summary.component'
import { ResPlanService } from './resourcePlans/shared/resPlan.service'

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http'


@NgModule({
  declarations: [
    AppComponent,
    ResPlanSummaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule
  ],
  providers: [ ResPlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
