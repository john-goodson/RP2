"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var ResPlanServiceHack = (function () {
    function ResPlanServiceHack(_http) {
        this._http = _http;
        this._resPlanUrl = 'src/app/api/resPlans.json';
    }
    ResPlanServiceHack.prototype.getResPlans = function () {
        console.log('url of resplans.json = ', this._resPlanUrl);
        var subject = new Rx_1.Subject();
        var fn = function () {
            subject.next(RESPLANS);
            subject.complete();
        };
        var delay = 100;
        setTimeout(fn, delay);
        return subject;
    };
    ResPlanServiceHack.prototype.getEvent = function (id) {
        return RESPLANS.find(function (resplan) { return (resplan.id === id); });
    };
    return ResPlanServiceHack;
}());
ResPlanServiceHack = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ResPlanServiceHack);
exports.ResPlanServiceHack = ResPlanServiceHack;
var RESPLANS = [{
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
];
//# sourceMappingURL=resplans.service.js.map