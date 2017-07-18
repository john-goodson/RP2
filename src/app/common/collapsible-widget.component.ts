import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-widget',
  template: `
    <a  (click)="toggleContent()"><ng-content select=".widget-title"></ng-content></a>
   <ng-content *ngIf="visible" select=".widget-body"></ng-content>`
})
export class CollapsibleWidgetComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}