import { Component, Input } from '@angular/core';
import { IResPlan }  from '../resourcePlans/res-plan.model';

@Component({
  selector: 'header-row',
  templateUrl: './header-row.component.html',
  styles : [`
  .table-header
{
    position: relative;
}
  .header-cell
{
    text-align: left;
    height: 40px;
}
.body-cell 
{
    text-align: left;
}
.col1
{
    width:220px;
    min-width: 220px;
}
.col
{
    width:100px;
    min-width: 100px;
}`]
})
export class HeaderRowComponent {
  visible: boolean = true;
  @Input() _resPlans: IResPlan[];

  


    ngOnInit(): void {
        console.log('init fired');
        console.log(this._resPlans)


    }

}