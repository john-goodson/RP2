import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
@Output() onDateRangeChanged = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
  }

  public daterange: any = {};
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    startDate:new Date(2017,0,1),
    endDate: new Date(2017,11,31),
  };
  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(JSON.stringify(value));
    this.onDateRangeChanged.emit(value)


 
  }

}
