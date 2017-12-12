import { Component, ViewChild, OnInit, Inject, Input, Output, EventEmitter, OnDestroy, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IResPlan, IProject, IInterval } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { ResPlan, Project, Interval, ProjectActiveStatus } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ModalCommunicator } from '../../resourcePlans/modal-communicator.service';
import 'rxjs/add/operator/filter';

import { ProjectService } from '../../services/project-service.service'
import{ AppStateService} from '../../services/app-state.service'
import { ProjectListFilterPipe } from '../../common/project-list-filter.pipe'
import { Observable } from 'Rxjs'

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})


export class ProjectListComponent implements OnInit {

  @Input() projData: IProject[];
  selectedProjects: IProject[] = [];
  @Input() resPlan: FormGroup
  projectList = [];
  settings = {
    selectMode: 'multi',
    actions :{
      edit:false,
      delete:false,
      add:false
    },
    pager:{
      display:true,
      perPage:12
    },
  columns: {
    // id: {
    //   projUid: 'Project UID',
    //   title:'id'
    // },
    projName: {
      title: 'Project Name',
      width: '250px'
    }
    ,
    owner :
    {
       title:'Owner',
       width: '100px'
    },
    // ,startDate:
    // {
    //   title:'Start Date'  
    //
    // }
    // ,finishDate:
    // {
    //   title:'Finish Date'
    // }
    // ,
    projectChargeBackCategory :
    {
      title:'Project Chargeback'
    }
    // ,departments:
    // {
    //   title:'Departments'
    // }
    
    
  }
  
};
data:IProject[];

  constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator, private _projSvc: ProjectService
    ,private _appSvc:AppStateService
  ) { }


  ngOnInit(): void {
    
    console.log('project list component created');

    this._modalSvc.projectsAssignedToResource$.subscribe((projectsInRP: IProject[]) => {
      this._appSvc.loading(true);
      this._projSvc.getProjects().subscribe(projects => {

        this.projData = projects
        console.log('OBSERVABLE FIRED ON PROJECT LIST')
        let filteredProjects = this.projData.filter(val => {
          if (projectsInRP.map(t => t.projUid.toUpperCase()).indexOf(val.projUid.toUpperCase()) < 0)
            return val;
        }, (error) => console.log(error))
        console.log('all projects in RP=' + projectsInRP.map(t => t.projUid).toString())
        console.log('projects to show on modal=' + filteredProjects.map(t => t.projUid).toString())
        this.projectList = filteredProjects;
        this.data =filteredProjects;
        this._appSvc.loading(false);
      })

    }, (error) => {console.log(error);this._appSvc.loading(false);})
    this._modalSvc.modalSubmitted$.subscribe(success => this.clear(),
      error => console.log('error'));
  }

  rowClick(event) {
    this.selectProject(event.data.projUid);
  }

  clear() {
    //this._modalSvc.selectedProjects = [];
    this.selectedProjects = [];
  }

  selectProject(id: string) {
    //;
    //uncheck use case
    if (this.selectedProjects.filter(t => t.projUid == id).length > 0) {
      this.selectedProjects.reduce(function (r, v, i) {
        if (v.projUid == id)
          return i;
      }, -1);
    }
    else {
      this.selectedProjects.push(this.projData.filter(t => t.projUid == id)[0]);
    }
    this._modalSvc.selectedProjects = this.selectedProjects;

  }


  ngOnDestroy() {
    console.log("hey its gone")


  }


}

