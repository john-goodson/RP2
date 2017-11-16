import { Component, OnInit } from '@angular/core';
import * as moment from 'moment' 

export class Interval {
  // let mymom: moment.Moment 
  intervalName: string;
  intervalValue: string;
  start: Date
  end: Date
}

export enum Timescale {
  days = 3, 
  weeks = 4, 
  calendarMonths = 5, 
  quarters = 6,
  years = 7,
  financialMonths =8
}

@Component({
  selector: 'new-range-picker',
  template: `From: <input #startDate type="date" >
  To: <input #endDate type="date" >
`
  
})


export class NewRangePickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  buildIntervals(_startDate: Date, _endDate: Date , _timeScale: Timescale ) {

    let intervals: Interval[] = []
    let firstInterval = new Interval()

    if (moment(_startDate).day() === 0 ) {  //sunday
      firstInterval.start = moment(_startDate).toDate()
      firstInterval.end = moment(_startDate).toDate()
    }
    else {
      firstInterval.start = moment(_startDate).toDate()
      firstInterval.end = new Date(moment(_startDate).add(1, 'day').isoWeekday(7).format('MM-DD-YYYY'))
      console.log(firstInterval)
    }
    
    
    let lastInterval = new Interval()
    if (moment(_endDate).day() === 1)   {   //monday
      lastInterval.start = moment(_endDate).toDate()
      lastInterval.end = moment(_endDate).toDate()
    }
    else {
      lastInterval.start = moment(_endDate).subtract(1, 'day').isoWeekday(1).toDate()
      lastInterval.end = moment(_endDate).toDate()
    }
    
    intervals.push(firstInterval)
     
    let weeksToGenerate = moment(lastInterval.end).diff(moment(firstInterval.start),'weeks')

    for (var i = 0; i < weeksToGenerate; i++)  {
      let interval = new Interval()
      interval.start = moment(intervals[i].end).add(1,'days').toDate()
      interval.end = moment(intervals[i].end).add(1,'weeks').toDate()
      intervals.push(interval)
    }
    
    if (lastInterval.start > intervals[weeksToGenerate].end) {
      intervals.push(lastInterval)
    } 
    
  }


}
