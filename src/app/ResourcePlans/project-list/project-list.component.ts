import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy,OnChanges, ChangeDetectionStrategy } from '@angular/core';
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
  projData =
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

