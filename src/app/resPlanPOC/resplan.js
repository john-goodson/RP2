"use strict";
var ResPlan = (function () {
    function ResPlan(firstName, lastName) {
        if (firstName === void 0) { firstName = ''; }
        if (lastName === void 0) { lastName = ''; }
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return ResPlan;
}());
exports.ResPlan = ResPlan;
var Project = (function () {
    function Project(projName) {
        if (projName === void 0) { projName = ''; }
        this.projName = projName;
    }
    return Project;
}());
exports.Project = Project;
var Interval = (function () {
    function Interval(intervalName, intervalValue) {
        if (intervalName === void 0) { intervalName = ''; }
        if (intervalValue === void 0) { intervalValue = ''; }
        this.intervalName = intervalName;
        this.intervalValue = intervalValue;
    }
    return Interval;
}());
exports.Interval = Interval;
//# sourceMappingURL=resplan.js.map