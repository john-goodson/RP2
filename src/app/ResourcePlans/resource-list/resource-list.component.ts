import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IResPlan, IProject, IIntervals } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { Resource, IResource } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ResourcesModalCommunicatorService } from '../../resourcePlans/resources-modal-communicator.service';
import 'rxjs/add/operator/filter';

import { ResourceService } from '../../services/resource.service'
import { Observable } from 'Rxjs'


@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  resListForm: FormGroup;
  selectedResources: IResource[] = [];
  resData: IResource[]
  get resources(): FormArray {  //this getter should return all instances.
    return <FormArray>this.resListForm.get('resources');
  }

  constructor(private fb: FormBuilder, private _resSvc: ResourceService, private _modalResSvc: ResourcesModalCommunicatorService) { }

  ngOnInit() {
    this.resListForm = this.fb.group({
      resources: this.fb.array([])
    });
    this._modalResSvc.ResourcesSelected$.subscribe((resourcesPicked: IResource[]) => {
      this._resSvc.getResources().subscribe(resources => {
        this.resData = resources
        debugger;
        let filteredResources = this.resData.filter(val => {
       
       if(resourcesPicked.map(t=>t.resName.toUpperCase()).indexOf(val.resName.toUpperCase())< 0)
       return val;
     }) 
        console.log('filtered resources to pick=' + filteredResources.map(t => t.resUid).toString())
        this.buildResources(filteredResources);
      })
    })
  }

  clear() {
    this._modalResSvc.selectedResources = [];
    this.selectedResources = [];
    for (var i = 0; i < this.resources.length; i++) {
      var isSelected = (this.resources.controls[i] as FormGroup).controls['isSelected'];
      isSelected.setValue(false);
    }
    //this.buildProjects(this.projData);
  }

  buildResources(_resources: IResource[]) {
    var parent = (this.resources.parent as FormGroup);
    this.resources.controls = [];

    for (var i = 0; i < _resources.length; i++) {
      var resource = this.buildResource(_resources[i]);
      this.resources.push(resource);
    }
  }

  buildResource(_resource: IResource): FormGroup {
    var resGroup = this.fb.group({
      resUid: _resource.resUid,
      resName: _resource.resName,
      isSelected: false
    });

    return resGroup;
  }

  selectProject(id: string) {
    //;
    //uncheck use case
    if (this.selectedResources.filter(t => t.resUid == id).length > 0) {
      this.selectedResources.reduce(function (r, v, i) {
        if (v.resUid == id)
          return i;
      }, -1);
    }
    else {
      this.selectedResources.push(this.resData.filter(t => t.resUid == id)[0]);
    }
    this._modalResSvc.selectedResources = this.selectedResources;

  }

}
