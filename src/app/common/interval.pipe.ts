import { Pipe, PipeTransform } from '@angular/core';
import {WorkUnits} from "../resourcePlans/res-plan.model"
@Pipe({
  name: 'interval'
})
export class IntervalPipe  {

  transform(value: string, workUnits: WorkUnits): string {
    return this.getValue(value,workUnits) + this.getWorkUnitChar(workUnits);
  }

  getValue(value: string, workUnits: WorkUnits)
  {
    if(workUnits == WorkUnits.FTE)
    {
      return +(value) * 100;
    }
    return value;
  }
  getWorkUnitChar(workUnits:WorkUnits) : string
  {
    switch(+(workUnits))
    {
      case WorkUnits.days: return 'd';
      case WorkUnits.hours: return 'h';
      case WorkUnits.FTE: return '%';
      default : return '';
    }
  }
}
