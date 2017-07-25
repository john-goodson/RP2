import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { IResPlan }   from '../resourceplans/res-plan.model'
 
@Component({
  selector: 'form-array',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="cities">
        <div *ngFor="let city of cities.controls; index as i">
          <input [formControlName]="i" placeholder="City">
        </div>
      </div>
      <button>Submit</button>
    </form>
    
    <button (click)="addCity()">Add City</button>
    <button (click)="setPreset()">Set preset</button>
  `,
})
export class NestedFormArray {


  form = new FormGroup({
    cities: new FormArray([


      // new FormControl('SF'),
      // new FormControl('NY'),
    ]),
  });

   ngOnInit(): void {
 
    for (var i =0; i <3; i++) {
      this.cities.push(new FormControl(this.RESPLANS[i].name))

      console.log(this.cities); 
    }


    }
 
  get cities(): FormArray { return this.form.get('cities') as FormArray; }
 
  addCity() { this.cities.push(new FormControl()); }
 
  onSubmit() {
    console.log(this.cities.value);  // ['SF', 'NY']
   console.log('form.value: ' + this.form.value);    // { cities: ['SF', 'NY'] }
    console.log('formGroup Object: ' + this.form.value)
  }
 
  setPreset() { this.cities.patchValue(['LA', 'MTV']); }

  
   RESPLANS: IResPlan[]  = [{

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
                    "intervalValue": "26"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "26"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
             {
                "id": 2,
                "name": "Windows Upgrade",
                "intervals":  [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "33"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
             {
                "id": 3,
                "name": "Server Upgrades",
                "intervals":  [
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 2,
                "name": "Project 123 - Joe Colstad",
                "intervals":  [
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            }



        ]
    },
    {
        "id": 3,
        "name": "Stephen Donna",
        "org": {
            "location": "Nashville",
            "title": "PS Admin",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": 1,
                "name": "BPG Project XYZ for SSC",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "74"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 2,
                "name": "Business Intelligence Improvement Project",
                "intervals":  [
                    {
                    "intervalName": "jan",
                    "intervalValue": "18"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 3,
                "name": "Automatic Project Creation on a Dime",
                "intervals":  [
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            }



        ]
    },
    {

        "id": 4,
        "name": "Ronnie Frost",
        "org": {
            "location": "Nashville",
            "title": "Cons Engr",
            "manager": "Carey Gower"
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
                    "intervalValue": "26"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "26"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
             {
                "id": 2,
                "name": "Windows Upgrade",
                "intervals":  [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "33"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
             {
                "id": 3,
                "name": "Server Upgrades",
                "intervals":  [
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            }
        ]
    },
    {
        "id": 5,
        "name": "Carey Gower",
        "org": {
            "location": "Nashville",
            "title": "PS Admin",
            "manager": "Brady Plummer"
        },
        "projects": [
            {
                "id": 1,
                "name": "Project XYZ for Carey Gower",
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 2,
                "name": "Project 123 - carey",
                "intervals":  [
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            }



        ]
    },
    {
        "id": 6,
        "name": "Mark Fine",
        "org": {
            "location": "Nashville",
            "title": "PS Admin",
            "manager": "Ronnie"
        },
        "projects": [
            {
                "id": 1,
                "name": "BPG Project XYZ for SSC",
                "intervals": [
                    {
                    "intervalName": "jan",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "74"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 2,
                "name": "Business Intelligence Improvement Project",
                "intervals":  [
                    {
                    "intervalName": "jan",
                    "intervalValue": "18"
                },
                {
                    "intervalName": "feb",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "mar",
                    "intervalValue": "80"
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            },
            {
                "id": 3,
                "name": "Automatic Project Creation on a Dime",
                "intervals":  [
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
                }, 
                {
                    "intervalName": "apr",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "may",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "jun",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "jul",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "aug",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "sep",
                    "intervalValue": "80"
                },
                 {
                    "intervalName": "oct",
                    "intervalValue": "40"
                },
                {
                    "intervalName": "nov",
                    "intervalValue": "80"
                },
                {
                    "intervalName": "dec",
                    "intervalValue": "80"
                }
                ]
            }



        ]
    }
]




}