import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ResPlanListComponent } from '../ResourcePlans/res-plan-list.component'

@Injectable()
export class ResPlanEditGuard implements CanDeactivate<ResPlanListComponent> {

    canDeactivate(component: ResPlanListComponent): boolean {
        debugger
        if (component.mainForm.dirty) {
            
            return confirm(`You have unsaved changes.  Continue without saving? `);
        }
        return true;
    }
}