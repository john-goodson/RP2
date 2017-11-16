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
var ErrorComponent = (function () {
    function ErrorComponent() {
        // starWidth: number;
        this.counter = 0;
        this.messageClicked = new core_1.EventEmitter();
    }
    ErrorComponent.prototype.ngOnInit = function () {
        console.log('hey... the message component initialized');
    };
    ErrorComponent.prototype.ngOnChanges = function () {
        // Convert x out of 5 starts
        // to y out of 86px width
        this.message = this.message + " world";
    };
    ErrorComponent.prototype.onClick = function () {
        this.messageClicked.emit("The message " + this.message + "  was clicked!");
        this.counter++;
        console.log('counter: ===== ' + this.counter);
    };
    return ErrorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ErrorComponent.prototype, "message", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ErrorComponent.prototype, "messageClicked", void 0);
ErrorComponent = __decorate([
    core_1.Component({
        selector: 'message',
        templateUrl: 'app/shared/messageComponent/message.component.html',
        styleUrls: ['app/shared/messageComponent/message.component.css']
    })
], ErrorComponent);
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=message.component.js.map