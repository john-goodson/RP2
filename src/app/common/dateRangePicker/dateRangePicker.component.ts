import { Component, Input, OnInit,
    Output, EventEmitter } from '@angular/core';
    import {MatDatepicker} from '@angular/material';
    import { NavigationEnd, Router,ActivatedRoute,Params } from '@angular/router';
    import { AppStateService } from '../../services/app-state.service'
    import {FormControl} from '@angular/forms'
@Component({
selector: 'date-range-picker',
templateUrl: 'dateRangePicker.component.html',
styleUrls: ['dateRangePicker.component.css']
})

export class DateRangePicker  { 
    // startPicker:MatDatepicker;
    // end:MatDatepicker;
    startDate:FormControl= new FormControl(this._appStateSvc.queryParams.fromDate.toISOString());
    endDate:FormControl= new FormControl(this._appStateSvc.queryParams.toDate.toISOString());
constructor(public router:Router,private _appStateSvc:AppStateService)
{

}
    SelectDates(start,end)
    {
       this._appStateSvc.queryParams.fromDate = start;
       this._appStateSvc.queryParams.toDate = end;
       this.router.navigate(['home/resPlans',this._appStateSvc.queryParams],{ preserveQueryParams:true} );
    }
}