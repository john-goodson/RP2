import { Component } from '@angular/core';



import { ActivatedRoute, Router  } from '@angular/router';

@Component({
   
    template: `<h2>Plan saved successfully</h2><br/>
    <button class="btn btn-primary" (click) = doSomething()>Go Back</button>
    `
})
export class FooComponent  {
    constructor(private _router: Router){

    }

    doSomething(): void {

         this._router.navigate(['/resPlans']);
    }

   }