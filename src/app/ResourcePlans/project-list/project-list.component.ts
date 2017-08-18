import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IResPlan, IProject, IIntervals } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { ResPlan, Project, Interval, ProjectActiveStatus } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ModalCommunicator } from '../../resourcePlans/modal-communicator.service';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']

})


export class ProjectListComponent implements OnInit {

  projListForm: FormGroup;
  @Input() projData: IProject[];
  errorMessage: any;
  selectedProjects: IProject[] = [];
  //@Input() proj

  get projects(): FormArray {  //this getter should return all instances.
    return <FormArray>this.projListForm.get('projects');
  }



  constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator) { }


  ngOnInit(): void {
    debugger;
    this.projListForm = this.fb.group({
      projects: this.fb.array([])
    });
    this.buildProjects(this.projData);
    this._modalSvc.modalSubmitted$.subscribe(success => this.clear(),
            error => console.log('error'));
  }
clear()
{
  this._modalSvc.projectIdArray = [];
  this.selectedProjects =[];
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
    this._modalSvc.projectIdArray = this.selectedProjects;
  }


  ngOnDestroy() {
    console.log("hey its gone")


  }


}

