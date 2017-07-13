import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-table',
  templateUrl: '',

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

