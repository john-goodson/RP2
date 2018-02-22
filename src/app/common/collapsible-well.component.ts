import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styles: [`
  .well.pointable {
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0
}

.well.pointable {
    padding-bottom: .1em;
    padding-top: auto;
  
}
.datesForPrints {
  display: none;
}

div {
  margin: 0;
}

@media print {
  .datesForPrints{
    display: block !important;
  }
}

  `]
})
export class CollapsibleWellComponent {
  visible: boolean = true;
  // htmlLocationCollection = document.getElementsByTagName("tbody");
  // arrayOfCollapsibleWellComponents = Array.from(this.htmlLocationCollection);
  // wellComponentLocation: boolean;
  
  // checkHeading(): void {
  //   this.arrayOfCollapsibleWellComponents.forEach((divWellContainer)=>{
  //     console.log("inside cheackHeading");
  //     console.log(divWellContainer.getBoundingClientRect().bottom, ":Bottom figure");
  //     // console.log("top levels of div well container--A:",divWellContainer.getBoundingClientRect().bottom);
  //     //if bottom < 150 then it is true...otherwise false. use ngIf for the resPlan Header Row
  //     if (divWellContainer.getBoundingClientRect().bottom < 300) {
  //       console.log("in here....");
  //       this.wellComponentLocation = true;
  //     }
  //     //style within the element tag for resPlanHeaderRow on the collapsible well template with a margin bottom of 3%;
  //   })

  // }
  // ngOnInit(){
  //   this.checkHeading();
  // }

  toggleContent() {
    this.visible = !this.visible;
  }
}
