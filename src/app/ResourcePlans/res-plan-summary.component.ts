import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { IResPlan } from  './res-plan.model'
import { ResPlanService } from './shared/resPlan.service'
import { ResPlanServiceHack}  from './shared/resPlanHack.service'



@Component({

  templateUrl: './res-plan-summary.component.html',


  styles: [`
    .container { padding-left:20px; padding-right:20px; }
    .event-image { height:100px; }
    a {cursor:pointer},
    
  `]
})
export class ResPlanSummaryComponent implements OnInit {
  resPlans: IResPlan[]
  editMode: boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';
  errorMessage: string;

  constructor(private _resPlanSvc: ResPlanServiceHack, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this._resPlanSvc.getResPlans().subscribe(resPlans => this.resPlans = resPlans, 
      error => this.errorMessage = <any>error)
  }
}

//ngOnInit  

// this.route.data.forEach((data) => {
    //   this.event = data['event'];
    //   this.addMode = false;
    //})
  
//   editResPlan() {
//     this.editMode = true
//   }

//   saveNewSession(session:ISession) {
//     const nextId =  Math.max.apply(null, this.event.sessions.map(s => s.id));
//     session.id = nextId + 1
//     this.event.sessions.push(session);
//     this.eventService.saveEvent(this.event).subscribe();
//     this.addMode = false
//   }

//   cancelAddSession() {
//     this.addMode = false
//   }
// 