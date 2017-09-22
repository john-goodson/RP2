import { Component,ViewChild, OnInit, Inject, Input, Output, EventEmitter, OnDestroy,OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IResPlan, IProject, IInterval } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { ResPlan, Project, Interval, ProjectActiveStatus } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ModalCommunicator } from '../../resourcePlans/modal-communicator.service';
import 'rxjs/add/operator/filter';

import { ProjectService }  from '../../services/project-service.service'
import {ProjectListFilterPipe} from '../../common/project-list-filter.pipe'
import {Observable} from 'Rxjs'
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table-bootstrap-4'

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})


export class ProjectListComponent implements OnInit {

  @Input() projData: IProject[]; 
  selectedProjects: IProject[] = [];
   @Input() resPlan:FormGroup
    projectList = [];
    projListResource:DataTableResource<IProject[]>;
    @ViewChild(DataTable) projectListTable;
    projectsCount = 0;

  
  
  translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };
  
  constructor(private fb: FormBuilder, private _modalSvc: ModalCommunicator,private _projSvc: ProjectService) { }
 

  ngOnInit(): void {
    console.log('project list component created');
     
    this._modalSvc.projectsAssignedToResource$.subscribe((projectsInRP:IProject[])=>{
     this._projSvc.getProjects().subscribe(projects => {
               
                this.projData = projects
                console.log('OBSERVABLE FIRED ON PROJECT LIST')
     //
      let filteredProjects = this.projData.filter(val => {
       
       if(projectsInRP.map(t=>t.projUid.toUpperCase()).indexOf(val.projUid.toUpperCase())< 0)
       return val;
     }) 
       console.log('all projects in RP=' + filteredProjects.map(t=>t.projUid).toString())
        this.projectList = filteredProjects;
        this.projListResource =  new DataTableResource(this.projectList)
        this.projListResource.count().then(count => this.projectsCount = count);
        this.reloadProjects({limit:8,offset:0});
        //this.buildProjects(filteredProjects);
      
    })
        
       
      
    })
    this._modalSvc.modalSubmitted$.subscribe(success => this.clear(),
            error => console.log('error'));
  }

  reloadProjects(params) {
    if(this.projListResource)
        this.projListResource.query(params).then(projects => this.projectList = projects);
    }

     rowClick(rowEvent) {
       this.selectProject(rowEvent.row.item.projUid);
    }

clear()
{
  this._modalSvc.selectedProjects = [];
  this.selectedProjects =[];
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
    this._modalSvc.selectedProjects = this.selectedProjects;
  
  }


  ngOnDestroy() {
    console.log("hey its gone")


  }


}

