import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'collapsible-well',
  templateUrl: './collapsible-well.component.html'
})
export class CollapsibleWellComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
