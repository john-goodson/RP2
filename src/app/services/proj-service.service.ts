import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { IResPlan } from '../resourcePlans/res-plan.model';
import { IProject } from '../resourcePlans/res-plan.model';
import { IIntervals } from '../resourcePlans/res-plan.model';

@Injectable()
export class ProjectService {
  
    private projListUrl = 'api/projects'

    constructor(private http: Http) { }

    

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getProjects(): Observable<IProject[]> {
        console.log("entering getProjects method:")
        return this.http.get(this.projListUrl)
            .map(this.extractData)
            .do(data => console.log('getProjects from REST: ' + JSON.stringify(data)))
            .catch(this.handleError);
            
    }
}
