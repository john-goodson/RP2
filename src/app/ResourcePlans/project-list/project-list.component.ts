import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IResPlan, IProject, IIntervals } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { ResPlan, Project, Interval, ProjectActiveStatus } from '../res-plan.model';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']

})


export class ProjectListComponent implements OnInit {

  projListForm: FormGroup;
  projData: IProject[];
  errorMessage: any;

@Output() selectedProjects = new EventEmitter()

  get projects(): FormArray {  //this getter should return all instances.
    return <FormArray>this.projListForm.get('projects');
  }

  constructor(private fb: FormBuilder) { }




  ngOnInit(): void {

    this.projListForm = this.fb.group({
      projects: this.fb.array([])
    });
    this.projData =
      [
        {
          "id": 10,
          "name": "Centennial Hosp Storage Array",
          "projProperties": {
            "owner": "John Goodson",
            "startDate": new Date("8/1/2017"),
            "finishDate": new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
              { "deptName": "BPG" }
            ]
          }
        },
        {
          "id": 11,
          "name": "Centennial Hosp ER Kiosk Upgrade",
          "projProperties": {
            "owner": "John Goodson",
            "startDate": new Date("8/1/2017"),
            "finishDate": new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
              { "deptName": "BPG" }
            ]
          }
        },
        {
          "id": 12,
          "name": "Good Sheppard Hosp Nursing Certification",
          "projProperties": {
            "owner": "Joe Colstad",
            "startDate": new Date("8/1/2017"),
            "finishDate": new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
              { "deptName": "BPG" }
            ]
          }
        },
        {
          "id": 13,
          "name": "Mercy Health Lounge",
          "projProperties": {
            "owner": "Stephen Donna",
            "startDate": new Date("8/1/2017"),
            "finishDate": new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
              { "deptName": "BPG" }
            ]
          }
        },
        {
          "id": 14,
          "name": "Centennial Hosp Nursing Station Board Upgrade",
          "projProperties": {
            "owner": "John Goodson",
            "startDate": new Date("8/1/2017"),
            "finishDate": new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
              { "deptName": "BPG" }
            ]
          }
        }
      ];
      this.buildProjects(this.projData) 
      debugger; 
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

  submitSelected() {

    
  }

  ngOnDestroy() {
    console.log("hey its gone")


  }


}

