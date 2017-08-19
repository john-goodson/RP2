import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {IProject} from "./res-plan.model"
 
@Injectable()
export class ModalCommunicator {

  constructor() { }
 
  // Observable string sources
  public projectArray:IProject[];
  private modalSubmittedSource = new Subject<string>();
  private modalCancelledSource = new Subject<string>(); 
 
  // Observable string streams
  //projectIdArray$ = this.projectIdArraySource.asObservable();
  modalSubmitted$ = this.modalSubmittedSource.asObservable();
  modalCancelled$ = this.modalCancelledSource.asObservable();
 
  
 
  modalSubmitClicked() {
    debugger; 
    this.modalSubmittedSource.next();
  }

  modalCancelClicked() {
    this.modalCancelledSource.next();
  }

  
}