import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IResPlan } from '../resourceplans/res-plan.model'

@Component({
  selector: 'form-array',
  templateUrl: './formArray.component.html'
})

export class NestedFormArray {


  form = new FormGroup({

    resNames: new FormArray([
    ]),
    projects: new FormArray([
    ]),
    intervals: new FormArray([]),

  });

  ngOnInit(): void {

    console.log(this.RESPLANS.length);
    console.log(this.RESPLANS[0].projects.length)
    for (var i = 0; i < this.RESPLANS.length; i++) {
      this.resNames.push(new FormControl(this.RESPLANS[i].name));
      for (var j = 0; j < this.RESPLANS[i].projects.length; j++) {
        this.projects.push(new FormControl(this.RESPLANS[i].projects[j].name))
        for (var k = 0; k < this.RESPLANS[i].projects[j].intervals.length; k++) {
          this.intervals.push(new FormControl(this.RESPLANS[i].projects[j].intervals[k]))

        }

      }
      

    }


  }

  buildIntervalControls() {


  }


  get resNames(): FormArray { return this.form.get('resNames') as FormArray; }

  get projects(): FormArray { return this.form.get('projects') as FormArray; }

  get intervals(): FormArray { return this.form.get('intervals') as FormArray; }

  addCity() { this.projects.push(new FormControl()); }

  onSubmit() {
    console.log(this.projects.value);  // ['SF', 'NY']
    console.log('form.value: ' + this.form.value);    // { projects: ['SF', 'NY'] }
    console.log('formGroup Object: ' + this.form.value)
  }

  setPreset() { this.projects.patchValue(['LA', 'MTV']); }


  RESPLANS: IResPlan[] = [{

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
        "intervals": [
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
        "intervals": [
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
        "intervals": [
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
        "intervals": [
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
      }



    ]
  }
  ]




}