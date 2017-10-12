import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {IResPlan,Timescale,WorkUnits} from '../resourcePlans/res-plan.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'res-plan-timescale',
  templateUrl: './res-plan-timescale.component.html',
  styleUrls: ['./res-plan-timescale.component.css']
})
export class ResPlanTimescaleComponent implements OnInit {
 @Output() onTimescaleChanged = new EventEmitter<Timescale>();
  constructor() { }
timescale:Timescale;
  ngOnInit() {
  }

  timescaleChange(value:number)
  {
   this.onTimescaleChanged.emit(value);
  }

}
