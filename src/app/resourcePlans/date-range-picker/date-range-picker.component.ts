import { Component, OnInit, EventEmitter, Output } from '@angular/core';
declare var moment : any 

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
  };
  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    debugger
    console.log(JSON.stringify(value));
    this.onDateRangeChanged.emit(value)


 
  }

}
