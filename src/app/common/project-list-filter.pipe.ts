import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectListFilter'
})
export class ProjectListFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
