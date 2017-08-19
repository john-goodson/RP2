import { Component, OnInit } from '@angular/core';
import { Http , Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

@Component({
  
  template: `<button type = "button" (click) = "pushNumber()">Push Number</button>
  <button type = "button" (click) = "createObserver1()">create Observer 1</button>
  <button type = "button" (click) = "createObserver2()">create Observer 2</button>
  <button type = "button" (click) = "createObserver3()">create Observer 3</button>
  `, 
  styleUrls: ['./rxjs-component.component.css']
})
export class Rxjs2 implements OnInit {

  numbers: Array <any> = [1, 3, 5, 6];
  source1: Observable<any> 
  source2: Observable<any> 
  source3: Observable<any> 

  constructor() { }

  ngOnInit() {
    //creating observers in various ways
    this.source1 = Observable.fromEvent(document, "mousemove")
    .map((e: MouseEvent) => {
     return  {
      x: e.clientX,
      y: e.clientY
     }
      
    }).filter((val) => val.x > 444)
    
  }

  createObserver1() {
    console.log("inside createObserver1 yo")
    //note the observable is calling these next, error and complete methods.
    //let observer = this.source.subscribe((x) => console.log(x), (y) => console.log('error')); 
    let observer = this.source1.subscribe((value:any) => console.log( value), 
    (error: any) => console.log("didn't work"), 
    () => console.log('its done yo'));   // note () cause complete function doesn't get any parametsrs.

    //let fooObserver = this.source1.subscribe((v) => console.log(v), (e) => console.log('nope'), () => console.log('done')); 
    
  }

  createObserver2() {
    console.log("inside createObserver2")
    //note the observable is calling these next, error and complete methods.
    //let observer = this.source.subscribe((x) => console.log(x), (y) => console.log('error')); 
    let observer = this.source2.subscribe((value:any) => console.log('value: ' + value), 
    (error: any) => console.log("didn't work"), 
    () => console.log('Observable 2 is done'));   // note () cause complete function doesn't get any parametsrs.
  }

  createObserver3() {
    console.log("inside createObserver2")
    //note the observable is calling these next, error and complete methods.
    //let observer = this.source.subscribe((x) => console.log(x), (y) => console.log('error')); 
    let observer = this.source3.subscribe((value:any) => console.log('value: ' + value), 
    (error: any) => console.log("didn't work"), 
    () => console.log('Observable 3 is done'));   // note () cause complete function doesn't get any parametsrs.
  }




  pushNumber() {
    
    this.numbers.push('33') ; 
    console.log('after pushing number: ' + this.numbers)
  }

   

}
