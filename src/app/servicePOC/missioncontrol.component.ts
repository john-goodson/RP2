import { Component }          from '@angular/core';

import { MissionService }     from './mission.service';

let $: any
let jQuery: any

@Component({
 selector: 'mission-control',
 template: `
   <h2>Mission Control</h2>
   <button (click)="announce()">Announce mission</button>
   <my-astronaut *ngFor="let astronaut of astronauts"
     [astronaut]="astronaut">
   </my-astronaut>
   <h3>History</h3>
   <ul>
     <li *ngFor="let event of history">{{event}}</li>
   </ul>
 `,
 providers: [MissionService]
})
export class missionControlComponent {
 astronauts = ['Lovell', 'Swigert', 'Haise', 'Nishant', 'Goodson'];
 history: string[] = [];
 missions = ['Fly to the moon!',
             'Fly to mars!',
             'Fly to Vegas!'];
 nextMission = 0;


 constructor(private missionService: MissionService) {
  //debugger;  
  missionService.missionConfirmed$.subscribe(
     astronaut => {
       this.history.push(`${astronaut} confirmed the mission`);

     });
 }

 announce() {
   debugger
   let mission = this.missions[this.nextMission++];
   this.missionService.announceMission(mission);
   this.history.push(`Mission "${mission}" announced`);
   if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
 }
}