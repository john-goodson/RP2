import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cellWorkUnits'
})
export class CellWorkUnitsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
