import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.css']
})
export class ActionsMenuComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  submit()
  {
    debugger;
    this.onSubmit.emit();
  }

}
