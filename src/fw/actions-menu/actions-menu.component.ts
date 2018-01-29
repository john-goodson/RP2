import { Component, OnInit,ViewChild } from '@angular/core';
import { AppStateService} from '../../app/services/app-state.service'
import { MatMenu} from '@angular/material'

@Component({
  selector: 'actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.css']
})
export class ActionsMenuComponent implements OnInit {
  
  constructor(private _appStateSvc:AppStateService) { }
  disableSave: boolean;
  disableDelete:boolean = true;
  disableHide:boolean =true;

  ngOnInit() {
    this._appStateSvc.formDirtyState$.subscribe(value=>this.disableSave = !value)
     this._appStateSvc.deleteState$.subscribe(value=>{debugger;this.disableDelete = !value})
     this._appStateSvc.hideState$.subscribe(value=>{debugger;this.disableHide= !value})
    
    debugger;
    //this.delHide.items;
  }

  submit()
  {
    debugger;
    this._appStateSvc.saveClick();
  }

  addResources()
  {
    this._appStateSvc.addResourcesClick();
  }

  delete()
  {
    debugger;
    this._appStateSvc.deleteClick();
  }

  hide()
  {
    debugger;
    this._appStateSvc.hideClick();
  }

  exitToPerview()
  {
    this._appStateSvc.exitToPerviewClick()
  }

  printToPdf() {
    this._appStateSvc.printToPdfClick();
  }


  toggleText(event:Event)
  {
    debugger;
  //  if(event.srcElement.textContent == 'Show Actuals')
  //  {
  //   event.srcElement.textContent= 'Hide Actuals';
  //  }
  //  else{
  //   event.srcElement.textContent = 'Show Actuals';
  //  }
   this._appStateSvc.queryParams.showTimesheetData = !this._appStateSvc.queryParams.showTimesheetData;
   this._appStateSvc.showOrHideActuals(this._appStateSvc.queryParams.showTimesheetData);
  }

  getShowActualsText() : string
  {
    if(this._appStateSvc.queryParams.showTimesheetData == true)
    {
      return "Hide Actuals"
    }
    else
    {
      return "Show Actuals"
    }
  
  }

}
