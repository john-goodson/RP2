
import { Component} from '@angular/core'
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IResPlan} from '../resourcePlans/res-plan.model'


export class ResPlanData implements InMemoryDbService {
  createDb() {
    let resPlans : IResPlan[] = [
        
        {
        "id": 1,
        "name": "Carey Gower",
        "org": {
            "location": "Nashville",
            "title": "Director",
            "manager": "Brady"
        },
        "projects": [
            {
                "id": "1",
                "name": "Data Center Consolidation",
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
                "id": "2",
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
                    "intervalValue": "80.5"
                }
                ]
            },
             {
                "id": "3",
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
                    "intervalValue": "45.5"
                }
                ]
            },
            {
                "id": "4",
                "name": "Payment Processing Upgrade",
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
        "name": "John Goodson",
        "org": {
            "location": "Nashville",
            "title": "Cons Engr",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": "1",
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
                "id": "2",
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
                    "intervalValue": "80.5"
                }
                ]
            },
             {
                "id": "3",
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
                    "intervalValue": "45.5"
                }
                ]
            }
        ]
    },
    {
        "id": 3,
        "name": "Joe Colstad",
        "org": {
            "location": "Nashville",
            "title": "PS Admin",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": "1",
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
                "id": "2",
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
    
    
    
    ;
    return {resPlans};
  }
}