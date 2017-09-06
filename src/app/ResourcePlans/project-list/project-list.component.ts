import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy,OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IResPlan, IProject, IIntervals } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { ResPlan, Project, Interval, ProjectActiveStatus } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ModalCommunicator } from '../../resourcePlans/modal-communicator.service';
import 'rxjs/add/operator/filter';

import { ProjectService }  from '../../services/project-service.service'
import {ProjectListFilterPipe} from '../../common/project-list-filter.pipe'
import {Observable} from 'Rxjs'


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})



export class ProjectListComponent implements OnInit {

  @Input() projData: IProject[]; 
  projListForm: FormGroup;
  
  //projData: IProject[]; 
  errorMessage: any;
  selectedProjects: IProject[] = [];
   @Input() resPlan:FormGroup
  //@Input() proj

  get projects(): FormArray {  //this getter should return all instances.
    return <FormArray>this.projListForm.get('projects');
  }
  
  
  constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator,private _projSvc: ProjectService) { }
 

  ngOnInit(): void {
    console.log('project list component created');
     debugger;
    this.projListForm = this.fb.group({
      projects: this.fb.array([])
    });
    debugger;
     this._projSvc.getProjects().subscribe(projects => {
               
                this.projData = projects
     })
    this._modalSvc.projectsAssignedToResource$.subscribe((projectsInRP:IProject[])=>{
       console.log('OBSERVABLE FIRED ON PROJECT LIST')
      
      let filteredProjects = this.projData.filter(val => {
       
       if(projectsInRP.map(t=>t.projUid.toUpperCase()).indexOf(val.projUid.toUpperCase())< 0)
       return val;
    })
        
        console.log('all projects in RP=' + filteredProjects.map(t=>t.projUid).toString())
        
        this.buildProjects(filteredProjects);
      
    })
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
    this.buildProjects(this.projData);
}
  buildProjects(_projects: IProject[]) {
     this.projects.setValue([]);
    for (var i = 0; i < _projects.length; i++) {
      var project = this.buildProject(_projects[i]);
      this.projects.push(project);
    }
  }

  buildProject(_project: IProject): FormGroup {

    var projGroup = this.fb.group({
      id: _project.projUid,
      name: _project.projName,
      isSelected : false
    });

    return projGroup;
  }

  selectProject(id: string) {
    //;
    //uncheck use case
    if (this.selectedProjects.filter(t => t.projUid == id).length > 0) {
      this.selectedProjects.reduce(function(r, v, i) {
        if (v.projUid == id)
          return i;
      }, -1);
    }
    else {
      this.selectedProjects.push(this.projData.filter(t => t.projUid == id)[0]);
    }
    this._modalSvc.projectArray = this.selectedProjects;
  
  }


  ngOnDestroy() {
    console.log("hey its gone")


  }


}

