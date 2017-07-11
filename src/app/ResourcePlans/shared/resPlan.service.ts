import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IResPlan } from '../res-plan.model';

@Injectable()
export class ResPlanService {
    private _resPlanUrl = 'src/app/api/resPlans.json';

    constructor(private _http: Http) { }

    getResPlans(): Observable<IResPlan[]> {
        console.log('url of resplans.json = ', this._resPlanUrl );
        return this._http.get(this._resPlanUrl)
            .map((response: Response) => <IResPlan[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getResPlan(id: number): Observable<IResPlan> {
        return this.getResPlans()
            .map((resPlans: IResPlan[]) => resPlans.find(r => r.id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}




