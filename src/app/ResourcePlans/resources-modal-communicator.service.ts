import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {IResource} from "./res-plan.model"
 import { Observable} from  'rxjs'

@Injectable()
export class ResourcesModalCommunicatorService {

 
  constructor() { }
 
  // Observable string sources
  public selectedResources:IResource[];
  public ResourcesSelect = new Subject<IResource[]>();
  private modalSubmittedSource = new Subject<string>();
  private modalCancelledSource = new Subject<string>(); 
 
  // Observable string streams
  //projectIdArray$ = this.projectIdArraySource.asObservable();
  modalSubmitted$ = this.modalSubmittedSource.asObservable();
  modalCancelled$ = this.modalCancelledSource.asObservable();
  ResourcesSelected$ = this.ResourcesSelect.asObservable();
 ResourcesSelected(projectsAssigned:IResource[])
 {
   this.ResourcesSelect.next(projectsAssigned);
 }
  
  modalSubmitClicked() {
    //; 
    this.modalSubmittedSource.next();
  }

  modalCancelClicked() {
    
    this.modalCancelledSource.next();
  }

  
}
