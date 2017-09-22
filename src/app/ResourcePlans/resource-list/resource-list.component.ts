import { Component,ViewChild, OnInit, Inject, Input, Output, EventEmitter, OnDestroy, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IResPlan, IProject, IInterval } from '../res-plan.model'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormGroupName } from '@angular/forms';


import { Resource, IResource } from '../res-plan.model';
import { SimpleModalComponent } from '../../common/simple-modal.component';
import { ResourcesModalCommunicatorService } from '../../resourcePlans/resources-modal-communicator.service';
import 'rxjs/add/operator/filter';

import { ResourceService } from '../../services/resource.service'
import { Observable } from 'Rxjs'
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table-bootstrap-4'


@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  selectedResources: IResource[] = [];
  resData: IResource[]
  resourceList = [];
    resListResource:DataTableResource<IProject[]>;
    @ViewChild(DataTable) resourceListTable;
    resourcesCount = 0;
     translations = <DataTableTranslations>{
        indexColumn: 'resUid',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

  constructor(private fb: FormBuilder, private _resSvc: ResourceService, private _modalResSvc: ResourcesModalCommunicatorService) { 
    
  }

  ngOnInit() {
    this._modalResSvc.ResourcesSelected$.subscribe((resourcesPicked: IResource[]) => {
      this._resSvc.getResources().subscribe(resources => {
        this.resData = resources
        
        let filteredResources = this.resData.filter(val => {
       
       if(resourcesPicked.map(t=>t.resName.toUpperCase()).indexOf(val.resName.toUpperCase())< 0)
       return val;
     }) 
        console.log('filtered resources to pick=' + filteredResources.map(t => t.resUid).toString())
        this.resourceList = filteredResources;
        this.resListResource =  new DataTableResource(this.resourceList)
        this.resListResource.count().then(count => this.resourcesCount = count);
        this.reloadResources({limit:8,offset:0,sortBy:"rating",sortAsc:false});
      })
    })

    this._modalResSvc.modalSubmitted$.subscribe(success => this.clear(),
            error => console.log('error'));
  }

  reloadResources(params) {
    if(this.resListResource)
        this.resListResource.query(params).then(resources => this.resourceList = resources);
    }

     rowClick(rowEvent) {
       this.selectResource(rowEvent.row.item.resUid);
    }

  clear() {
    this._modalResSvc.selectedResources = [];
    this.selectedResources = [];
  }

  

  selectResource(id: string) {
    //;
    //uncheck use case
    if (this.selectedResources .length > 0 && this.selectedResources.filter(t => t.resUid == id).length > 0) {
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
