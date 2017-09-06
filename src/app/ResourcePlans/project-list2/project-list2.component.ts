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

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';



@Component({
  selector: 'app-project-list2',
  templateUrl: './project-list2.component.html',
  styleUrls: ['./project-list2.component.css']
})

export class ProjectList2Component implements OnInit {
  pageTitle: string = 'Product Detail';
  project: IProject;
  errorMessage: string;
  private sub: Subscription;
  foo: string; 


  constructor(private fb: FormBuilder
    , private _modalSvc: ModalCommunicator
  , private _route: ActivatedRoute
  , private router: Router
  ) { }
 

  ngOnInit(): void {
    console.log('project list2 component created');
    this.sub = this._route.params.subscribe(
      params => {
          let id = params['id'];
          this.foo = id
  });

    
  }

  

}
