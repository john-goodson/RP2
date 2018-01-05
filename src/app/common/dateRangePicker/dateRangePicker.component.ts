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
    minDate;
    maxDate;
    endMinDate;
    endMaxDate;

    //this function determines whether a start date is valid. All dates are valid by default
    //this function is a built-in directive from angular material datepicker
    startDateValid = (startingDate:Date, endingDate: Date, minDate:Date): boolean => {
        console.log(this.startingDate, "this is starting Date in startDateValid")
        if(this.startingDate > this.endingDate) {
         return this.minDate = this.endingDate;
        //    return false;
        }
        return true;
    }

    endDateValid = (endMinDate: Date, startingDate:Date, endingDate:Date): boolean => {
        console.log("these are the dates in endDateValid",startingDate, endingDate);
        if(this.startingDate > this.endingDate) {
            // return true;
            return this.endMinDate = this.startingDate;
        }
        
        return true;
    }

     startingDateSelector(event: MatDatepickerInputEvent<Date>, startingDate:Date, endingDate:Date, minDate:Date) {
       console.log(event.value, "this is the event value from startingDateSelector");
       startingDate = event.value;
       console.log('what is the starting date (within startingDateSelector)?', this.startingDate);
       this.startDateValid(this.startingDate, this.endingDate, this.startingDate);
    }

      endingDateSelector(event: MatDatepickerInputEvent<Date>, startingDate:Date, endingDate:Date) {
        startingDate = this.startingDate;
        console.log("this is the event value from startingDateSelector")
        endingDate = event.value;
        console.log('what is the ending date(within endingDateSelector)?', this.endingDate);
        this.endDateValid(this.startingDate,this.startingDate, this.endingDate);

       }

       displayError(){
           return 'End Date must be after Start Date';
       }


    startDate:FormControl= new FormControl(this._appStateSvc.queryParams.fromDate.toISOString());
    endDate:FormControl= new FormControl(this._appStateSvc.queryParams.toDate.toISOString());
constructor(public router:Router,private _appStateSvc:AppStateService)
{

}

    SelectDates(start,end)
    {
       this.endDateValid(this._appStateSvc.queryParams.fromDate, this._appStateSvc.queryParams.fromDate, this._appStateSvc.queryParams.toDate);
       this._appStateSvc.queryParams.fromDate = start;
       this._appStateSvc.queryParams.toDate = end;
       this.router.navigate(['home/resPlans',this._appStateSvc.queryParams],{ preserveQueryParams:true} );
    }
}