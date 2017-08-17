import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core'
import { JQ_TOKEN } from '../common/jQuery.service'
import { IProject, ProjectActiveStatus } from './res-plan.model'

@Component({
  selector: 'proj-modal',
  template: `
  <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body" (click)="closeModal()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modal-body { height: 250px; overflow-y: scroll; }
  `]
})

export class ProjModalComponent {
  @Input() title: string;   // passed in from the parent component's markup
  @Input() elementId: string;  //ditto
  @Input() closeOnBodyClick: string;
  @ViewChild('modalcontainer') containerEl: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) {}

  closeModal() {
    if(this.closeOnBodyClick.toLocaleLowerCase() === "true") {
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }


  PROJECTS: IProject[] = [{
        "id": 10,
        "name": "Centennial Hosp Storage Array",
        "projProperties": {
            "owner": "John Goodson",
            "startDate": new Date("8/1/2017"),
            "finishDate": new Date("12/2/2018"),
            "projActiveStatus": ProjectActiveStatus.inProgress, 
            "departments": [
                { "deptName": "BPG"      }
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
                { "deptName": "BPG"      }
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
                { "deptName": "BPG"      }
            ]
        }
    },
    {
        "id": 13,
        "name": "Mercy Health Lounge East and West",
        "projProperties": {
            "owner": "Stephen Donna",
            "startDate": new Date("8/1/2017"), 
            "finishDate": new Date("12/1/2017"), 
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
                { "deptName": "BPG"      }
            ]
        }
    }
]



}