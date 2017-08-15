import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Subject, Observable}    from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { IProject,  ProjectActiveStatus } from '../resourcePlans/res-plan.model';


@Injectable()
export class MockProjectService {
    
    constructor(private _http: Http) { }

    getProjects(): Observable<IProject[]> {
        console.log('entering MockProjectService'); 
        let subject = new Subject<IProject[]>();
        debugger; 
        let fn = () => {
            subject.next(PROJECTS);
            subject.complete();
        };
        let delay = 100;
        setTimeout(fn, delay);
        //subject.do(data => console.log('projects from REST: ' + JSON.stringify(data)))
        return subject;
       
    }
}

const PROJECTS:IProject[] = [
    {
        "id": 10,
        "name": "Centennial Hosp Storage Array",
        "projProperties": {
            "owner": "John Goodson",
            "startDate":  new Date("8/1/2017"),
            "finishDate":  new Date("12/1/2017"),
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
            "startDate":  new Date("8/1/2017"),
            "finishDate":  new Date("12/1/2017"),
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
            "startDate":  new Date("8/1/2017"),
            "finishDate":  new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
                { "deptName": "BPG"      }
            ]
        }
    },
    {
        "id": 13,
        "name": "Mercy Health Lounge",
        "projProperties": {
            "owner": "Stephen Donna",
            "startDate":  new Date("8/1/2017"),
            "finishDate":  new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
                { "deptName": "BPG"      }
            ]
        }
    },
    {
        "id": 14,
        "name": "Centennial Hosp Nursing Station Board Upgrade",
        "projProperties": {
            "owner": "John Goodson",
            "startDate":  new Date("8/1/2017"),
            "finishDate":  new Date("12/1/2017"),
            "projActiveStatus": ProjectActiveStatus.inProgress,
            "departments": [
                { "deptName": "BPG"      }
            ]
        }
    }
]
    
