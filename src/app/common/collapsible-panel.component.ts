import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-panel',
  template: `
<div (click)="toggleContent()" class="panel panel-primary">
<div class = "panel-heading">
    <ng-content select="[panel-title]"></ng-content>
</div>
<div class = "panel-body" [ngStyle]="getPadding()" >
  <ng-content *ngIf="visible" select="[panel-body]"></ng-content>
  </div>

<div class = "panel-footer" [ngStyle]="getPadding()" >
  <ng-content *ngIf="visible" select="[panel-footer]"></ng-content>
  </div>
  </div>

  `,
  styles: [ 
         '.panel-body { padding: 15px; }'
  ]
  
})
export class CollapsiblePanelComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
   
  }

  getPadding()
  {
      if(this.visible === true)
      {
          return {padding: '15px'}
      }
      return {padding: '0px'} ;
  }
}

