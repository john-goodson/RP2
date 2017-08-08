import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IResPlan } from '../resourcePlans/res-plan.model';
import { IProject } from '../resourcePlans/res-plan.model';
import { IIntervals } from '../resourcePlans/res-plan.model';

@Injectable()
export class ResPlanService {
    private baseUrl = 'api/resPlans';

    constructor(private http: Http) { }

    getResPlans(): Observable<IResPlan[]> {
        console.log("entering getResPlans method:")
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getResPlans from REST: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getResPlan(id: number): Observable<IResPlan> {
        if (id === 0) {
        return Observable.of(this.initializeResPlan());
        // return Observable.create((observer: any) => {
        //     observer.next(this.initializeProduct());
        //     observer.complete();
        // });
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getResPlan: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteResPlan(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveResPlans(_resPlans: [IResPlan]): Observable<IResPlan> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        for (var i = 0; i < _resPlans.length; i++) {
            return this.updateResPlan(_resPlans[i], options);
        }
    }

    private createResPlan(resPlan: IResPlan, options: RequestOptions): Observable<IResPlan> {
        resPlan.id = undefined;
        return this.http.post(this.baseUrl, resPlan, options)
            .map(this.extractData)
            .do(data => console.log('createresPlan: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // private createProject(_resPlan: IResPlan, _project: IProject, options: RequestOptions): Observable<IResPlan> {
    //     _resPlan.id = undefined;
    //     return this.http.post(this.baseUrl, _project, options)
    //         .map(this.extractData)
    //         .do(data => console.log('createresPlan: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }


    private updateResPlan(resPlan: IResPlan, options: RequestOptions): Observable<IResPlan> {
        console.log('entering updateResPlan ')
        const url = `${this.baseUrl}/${resPlan.id}`;
        return this.http.put(url, resPlan, options)
            .map(() => resPlan)
            .do(data => console.log('updateresPlan: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

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

    




    initializeResPlan(): IResPlan {
        // Return an initialized object
        return {
            id: 0,
            name: null,
            org: null,
            projects: []
        };
    }
}
