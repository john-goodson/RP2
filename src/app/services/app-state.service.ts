import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject"
import { IQueryParams , Timescale, WorkUnits } from '../resourcePlans/res-plan.model'
import { CurrentCalendarYear, CurrentFiscalYear } from '../common/utilities'



@Injectable()

export class AppStateService {
  private loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();
  public currentYear = new CurrentCalendarYear()
  

  public queryParams: IQueryParams =  {
    fromDate: this.currentYear.startDate,
    toDate: this.currentYear.endDate,
    timescale: Timescale.calendarMonths,
    workunits: WorkUnits.FTE
  }
  
  
  constructor() { 


  }
  loading(value:boolean) {
    this.loadingSource.next(value);
  }
 
      //set up the default parameters needed by res-plan-list component
      // let currentYear = new CurrentCalendarYear()
      // let fromDate = route.params["fromDate"] && new Date(route.params["fromDate"]) || currentYear.startDate;
      // let toDate = route.params["toDate"] && new Date(route.params["toDate"]) || currentYear.endDate;
      // let timescale = route.params["timescale"] || Timescale.calendarMonths;
      // let workunits = route.params["workunits"] || WorkUnits.FTE;
  




}
