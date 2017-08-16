import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class ModalCommunicator {

  constructor() { }
 
  // Observable string sources
  private projectIdArraySource = new Subject<string>();
  private modalSubmittedSource = new Subject<string>();
  private modalCancelledSource = new Subject<string>(); 
 
  // Observable string streams
  projectIdArray$ = this.projectIdArraySource.asObservable();
  modalSubmitted$ = this.modalSubmittedSource.asObservable();
  modalCancelled$ = this.modalCancelledSource.asObservable();
 
  // Service message commands
  modifyProjectIds(id: string) {
    this.projectIdArraySource.next(id);
  }
 
  modalSubmitClicked() {
    debugger; 
    this.modalSubmittedSource.next();
  }

  modalCancelClicked() {
    this.modalCancelledSource.next();
  }

  
}