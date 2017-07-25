import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { IResPlan } from  './res-plan.model'
import { ResPlanService } from './shared/resPlan.service'
import { ResPlanServiceHack}  from './shared/resPlanHack.service'
// import $ from 'jquery';
import {AfterViewInit, AfterViewChecked} from '@angular/core'
import { JQ_TOKEN } from '../common/jquery.service'



@Component({

  templateUrl: './res-plans-home.component.html',
  styles:[`.outer-container
{
    background-color: #ccc;
    position: absolute;
    top:60px;
    left: 0;
    right: 0px;
    bottom: 40px;
}

.inner-container
{
    height: 100%;
    overflow: hidden;
}

`]
})
export class ResPlansHomeComponent implements OnInit, AfterViewChecked {
  resPlans: IResPlan[]
  editMode: boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';
  errorMessage: string;

  constructor(private _resPlanSvc: ResPlanServiceHack, private route: ActivatedRoute, @Inject(JQ_TOKEN) private $: any) {
 
  }

  ngOnInit() {
    this._resPlanSvc.getResPlans().subscribe(resPlans => this.resPlans = resPlans, 
      error => this.errorMessage = <any>error);
    

  }
ngAfterViewChecked() {
 
  this.setTableBody(false);
    this.$(window).resize(this.setTableBody(true));
    this.$(".table-body").scroll(function ()
    {
       this.scrollHeader(this);
    });
 
}
scrollHeader(t)
{
    t.$(".table-header").offset({ left: -1*t.scrollLeft });
}
    
  setTableBody(heightOnly)
{
    //console.log("setTableBody fired");
    this.$(".table-body").height(this.$(".resTable").height() - this.$(".table-header").height());
     if(heightOnly != true)
     this.$(".outer-container").width(this.$(".resTable").width());
    
}

  
    
}


