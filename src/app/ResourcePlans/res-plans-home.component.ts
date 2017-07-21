import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { IResPlan } from  './res-plan.model'
import { ResPlanService } from './shared/resPlan.service'
import { ResPlanServiceHack}  from './shared/resPlanHack.service'
import $ from 'jquery';
import {AfterViewInit} from '@angular/core';  


@Component({

  templateUrl: './res-plans-home.component.html',
  styles:[`.outer-container
{
    background-color: #ccc;
    position: absolute;
    top:0;
    left: 0;
    right: 0px;
    bottom: 40px;
}

.inner-container
{
    height: 100%;
    overflow: hidden;
    width:100%;
}

`]
})
export class ResPlansHomeComponent implements OnInit,AfterViewInit {
  resPlans: IResPlan[]
  editMode: boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';
  errorMessage: string;

  constructor(private _resPlanSvc: ResPlanServiceHack, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this._resPlanSvc.getResPlans().subscribe(resPlans => this.resPlans = resPlans, 
      error => this.errorMessage = <any>error);
      
    

  }
ngAfterViewInit() {
  $(document).ready(function () {
  this.setTableBody();
    $(window).resize(this.setTableBody);
    $(".table-body").scroll(function ()
    {
        $(".table-header").offset({ left: -1*this.scrollLeft });
    });
  });    
}
  getIntervalCount()
  {
      if(this.resPlans && this.resPlans.length> 0 && this.resPlans[0].projects && this.resPlans[0].projects.length > 0 
      && this.resPlans[0].projects[0].intervals)
      {
          return this.resPlans[0].projects[0].intervals.length;
      }
      return 0;
  } 
    
  setTableBody()
{
   console.log("setTableBody fired" + $(".outer-container").width() + "=" + $(".table").width()); 
   $(".table-body").height($(".inner-container").height() - $(".table-header").height());
    $(".outer-container").width($(".table").width());
    
}

  
    
}


