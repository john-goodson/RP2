import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy,OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IResPlan, IProject, IIntervals } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { ResPlan, Project, Interval, ProjectActiveStatus } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ModalCommunicator } from '../../resourcePlans/modal-communicator.service';
import 'rxjs/add/operator/filter';

import { ProjectService }  from '../../services/project-service.service'
import {Observable} from 'Rxjs'


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']

})


export class ProjectListComponent implements OnInit {

  projListForm: FormGroup;
  
  projData: IProject[] = this._projSvc.projects; 
  errorMessage: any;
  selectedProjects: IProject[] = [];
  
  //@Input() proj

  get projects(): FormArray {  //this getter should return all instances.
    return <FormArray>this.projListForm.get('projects');
  }
  
  constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator, private _projSvc: ProjectService) { }


  ngOnInit(): void {
    console.log('project list component created');
    this.projListForm = this.fb.group({
      projects: this.fb.array([])
    });
    this.buildProjects(this.projData);
    this._modalSvc.modalSubmitted$.subscribe(success => this.clear(),
            error => console.log('error'));
  }

clear()
{
  this._modalSvc.projectArray = [];
  this.selectedProjects =[];
  for(var i=0;i< this.projects.length;i++)
    {
      var isSelected = (this.projects.controls[i] as FormGroup).controls['isSelected'];
      isSelected.setValue(false);
    }
}
  buildProjects(_projects: IProject[]) {

    for (var i = 0; i < _projects.length; i++) {
      var project = this.buildProject(_projects[i]);
      this.projects.push(project);
    }
  }

  buildProject(_project: IProject): FormGroup {

    var projGroup = this.fb.group({
      id: _project.id,
      name: _project.name,
      isSelected : false
    });

    return projGroup;
  }

  selectProject(id: number) {
    debugger;
    //uncheck use case
    if (this.selectedProjects.filter(t => t.id == id).length > 0) {
      this.selectedProjects.reduce(function(r, v, i) {
        if (v.id == id)
          return i;
      }, -1);
    }
    else {
      this.selectedProjects.push(this.projData.filter(t => t.id == id)[0]);
    }
    this._modalSvc.projectArray = this.selectedProjects;
  
  }


  ngOnDestroy() {
    console.log("hey its gone")


  }


}

