import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResPlanSummaryComponent } from './resourcePlans/res-plan-summary.component'
import { ResPlanService } from './resourcePlans/shared/resPlan.service'
import { ResPlanServiceHack } from './resourcePlans/shared/resPlanHack.service'
import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { HttpModule } from '@angular/http';
import { ResPlanListComponent }  from './resourcePlans/res-plans.component';
import { CollapsibleWellComponent } from './common/collapsible-well.component'
import { CollapsiblePanelComponent } from './common/collapsible-panel.component'
import {ResPlansHomeComponent} from './resourcePlans/res-plans-home.component'
import {ResPlanDetailsComponent} from './resourcePlans/res-plan-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    ResPlanSummaryComponent,
    CollapsibleWellComponent,
    CollapsiblePanelComponent,
    ResPlanListComponent,
    ResPlansHomeComponent,
    ResPlanDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
          HttpModule
  ],
  providers: [ ResPlanServiceHack],
  bootstrap: [AppComponent]
})
export class AppModule { }
