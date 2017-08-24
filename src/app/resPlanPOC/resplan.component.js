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
var forms_1 = require("@angular/forms");
var resplan_service_1 = require("./resplan.service");
require("rxjs/add/operator/debounceTime");
var ResPlanComponent = (function () {
    function ResPlanComponent(fb, _resPlanSvc) {
        this.fb = fb;
        this._resPlanSvc = _resPlanSvc;
    }
    ResPlanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainForm = this.fb.group({
            resPlans: this.fb.array([this.buildResPlans()])
        });
        this._resPlanSvc.getResPlans().subscribe(function (resPlanData) { return _this.resPlanData = resPlanData; }, function (error) { return console.log('error'); });
        console.log(JSON.stringify(this.resPlanData));
    };
    ResPlanComponent.prototype.calculateTotals = function (fg) {
        var value = fg.value;
        for (var i = 0; i < value["totals"].length; i++) {
            var sum = 0;
            for (var j = 0; j < value["projects"].length; j++) {
                sum += +(value["projects"][j]["intervals"][i]["intervalValue"]);
            }
            value["totals"][i]['intervalValue'] = sum;
        }
        fg.setValue(value, { emitEvent: false });
        console.log('Totals... ' + JSON.stringify(value) + "      stop....");
    };
    ResPlanComponent.prototype.buildResPlans = function () {
        var _this = this;
        var resPlanGroup = this.fb.group({
            firstName: 'John',
            totals: this.fb.array([this.buildTotals()]),
            projects: this.fb.array([this.buildProjects()]),
        });
        resPlanGroup.valueChanges.subscribe(function (value) { return _this.calculateTotals(resPlanGroup); });
        return resPlanGroup;
    };
    ResPlanComponent.prototype.buildProjects = function () {
        return this.fb.group({
            projName: 'project xyz',
            intervals: this.fb.array([this.buildIntervals()])
        });
    };
    ResPlanComponent.prototype.buildIntervals = function () {
        return this.fb.group({
            intervalName: 'jan',
            intervalValue: '33'
        });
    };
    ResPlanComponent.prototype.buildTotals = function () {
        return this.fb.group({
            intervalName: 'jan',
            intervalValue: '33'
        });
    };
    ResPlanComponent.prototype.addResPlan = function () {
        this.resPlans.push(this.buildResPlans());
    };
    Object.defineProperty(ResPlanComponent.prototype, "foo", {
        get: function () {
            return this.resPlans.get('projects');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResPlanComponent.prototype, "resPlans", {
        get: function () {
            return this.mainForm.get('resPlans');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResPlanComponent.prototype, "projects", {
        get: function () {
            return this.mainForm.get['projects'];
        },
        enumerable: true,
        configurable: true
    });
    ResPlanComponent.prototype.addProject = function (i) {
        //this.mainForm.find('projects').push(this.buildProjects());
        this.resPlans.at(i).get('projects').push(this.buildProjects());
        console.log("passed in value: " + i);
    };
    ResPlanComponent.prototype.populateTestData = function () {
        
    };
    ResPlanComponent.prototype.save = function () {
        console.log('Saved: ' + JSON.stringify(this.mainForm.value));
    };
    return ResPlanComponent;
}());
ResPlanComponent = __decorate([
    core_1.Component({
        selector: 'my-resplan',
        templateUrl: './app/resplan/resplan.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, resplan_service_1.ResPlanServiceHack])
], ResPlanComponent);
exports.ResPlanComponent = ResPlanComponent;
//# sourceMappingURL=resplan.component.js.map