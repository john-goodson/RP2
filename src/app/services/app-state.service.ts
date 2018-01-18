import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject"
import { IQueryParams , Timescale, WorkUnits } from '../resourcePlans/res-plan.model'
import { CurrentCalendarYear, CurrentFiscalYear , Next12Months } from '../common/utilities'



@Injectable()

export class AppStateService {
  private loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();

  public next12Months = new Next12Months()  //default daterange
  

  public queryParams: IQueryParams =  {
    fromDate: this.next12Months.startDate,
    toDate: this.next12Months.endDate,
    timescale: Timescale.calendarMonths,
    workunits: WorkUnits.FTE,
    showTimesheetData:false
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
