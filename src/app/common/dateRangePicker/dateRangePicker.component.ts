import { Component, Input, OnInit,
    Output, EventEmitter } from '@angular/core';
    import {MatDatepicker} from '@angular/material';
    import {MatDatepickerInputEvent} from '@angular/material/datepicker';
    import { NavigationEnd, Router,ActivatedRoute,Params } from '@angular/router';
    import { AppStateService } from '../../services/app-state.service'
    import {FormControl, FormsModule} from '@angular/forms'
@Component({
selector: 'date-range-picker',
templateUrl: 'dateRangePicker.component.html',
styleUrls: ['dateRangePicker.component.css']
})

export class DateRangePicker  { 
    // startPicker:MatDatepicker;
    // end:MatDatepicker;
    events:  string[] = [];
    startingDate;
    endingDate;
    //this function determines whether a start date is valid. All dates are valid by default
    //this function is a built-in directive from angular material datepicker
    startDateValid = (startingDate:Date): boolean => {
        console.log(this.startingDate, "this is starting Date in startDateValid")
        return true;
    }
    endDateValid = (startingDate:Date, endingDate:Date): boolean => {
        console.log("these are the dates in endDateValid",startingDate, endingDate);
        if(this.startingDate >= this.endingDate) {
            return false;
        }
        
      return true;
    }

     startingDateSelector(event: MatDatepickerInputEvent<Date>, startingDate:Date, endingDate:Date) {
       console.log(event.value, "this is the event value from startingDateSelector");
       startingDate = event.value;
       console.log('what is the starting date (within startingDateSelector)?', this.startingDate);
       this.startDateValid(this.startingDate);
    }

      endingDateSelector(event: MatDatepickerInputEvent<Date>, startingDate:Date, endingDate:Date) {
        startingDate = this.startingDate;
        console.log("this is the event value from startingDateSelector")
        endingDate = event.value;
        console.log('what is the ending date(within endingDateSelector)?', this.endingDate);
        this.endDateValid(this.startingDate, this.endingDate);
       }

       //endingDateSelector

    startDate:FormControl= new FormControl(this._appStateSvc.queryParams.fromDate.toISOString());
    endDate:FormControl= new FormControl(this._appStateSvc.queryParams.toDate.toISOString());
constructor(public router:Router,private _appStateSvc:AppStateService)
{

}

    // SelectDates(start,end)
    // {
    //    this._appStateSvc.queryParams.fromDate = start;
    //    this._appStateSvc.queryParams.toDate = end;
    //    this.router.navigate(['home/resPlans',this._appStateSvc.queryParams],{ preserveQueryParams:true} );
    // }
}