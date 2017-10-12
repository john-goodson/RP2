import { Component, OnInit,Input } from '@angular/core';
import {IResPlan,Timescale,WorkUnits} from '../../resourcePlans/res-plan.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'res-plan-header-row',
  templateUrl: './res-plan-header-row.component.html',
  styleUrls: ['./res-plan-header-row.component.css']
})
export class ResPlanHeaderRowComponent implements OnInit {
visible: boolean = true;
 _resPlans: IResPlan[];

  

  constructor(private router: Router,private _route: ActivatedRoute) { }

  ngOnInit() {
  this._route.data.subscribe(values =>{
    this._resPlans = values.resPlans; 
    //console.log('header component data=' + JSON.stringify(values.resPlans))
  },(error)=>console.log(error));
  }

}
