import { Pipe, PipeTransform } from '@angular/core';
import {WorkUnits} from "../resourcePlans/res-plan.model"
@Pipe({
  name: 'interval'
})
export class IntervalPipe  {

  transform(value: string, workUnits: WorkUnits): string {
    return Number(value).toFixed(2) + this.getWorkUnitChar(workUnits);
  }
  getWorkUnitChar(workUnits:WorkUnits) : string
  {
    switch(+(workUnits))
    {
      case WorkUnits.days: return 'd';
      case WorkUnits.hours: return 'h';
      case WorkUnits.FTE: return '';
      default : return '';
    }
  }
}
