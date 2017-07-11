import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResPlanSummaryComponent } from './resourcePlans/res-plan-summary.component'
import { ResPlanService } from './resourcePlans/shared/resPlan.service'

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'


@NgModule({
  declarations: [
    AppComponent,
    ResPlanSummaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [ ResPlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
