import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'res-plan-home',
  templateUrl: './res-plan-home.component.html',
  styles:[`.outer-container
{
    background-color: #ccc;
    position: absolute;
    top:50px;
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
export class ResPlanHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
