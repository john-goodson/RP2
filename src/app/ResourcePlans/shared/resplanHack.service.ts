import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Subject, Observable}    from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { IResPlan, IProject } from '../res-plan.model';


@Injectable()
export class ResPlanServiceHack {

    
    private _resPlanUrl = 'src/app/api/resPlans.json';

    constructor(private _http: Http) { }

    getResPlans(): Observable<IResPlan[]> {
        console.log('url of resplans.json = ', this._resPlanUrl );
        let subject = new Subject<IResPlan[]>();
        
        let fn = () => {
            subject.next(RESPLANS);
            subject.complete();
        };
        let delay = 100;
        setTimeout(fn, delay);

        return subject;
       
    }

    getEvent(id:number):IResPlan {
        return RESPLANS.find(resplan => (resplan.id === id));
    }
}

const RESPLANS:IResPlan[] = [{

        "id": 1,
        "name": "John Goodson",
        "org": {
            "location": "Nashville",
            "title": "Cons Engr",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": 1,
                "name": "Data Center",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }
                ]
            },
             {
                "id": 2,
                "name": "Windows Upgrade",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }
                ]
            },
             {
                "id": 3,
                "name": "Server Upgrades",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "Joe Colstad",
        "org": {
            "location": "Nashville",
            "title": "PS Admin",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": 1,
                "name": "Project XYZ for Joe Colstad",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 2,
                "name": "Project 123 - Joe Colstad",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }
                ]
            }



        ]
    }
]
