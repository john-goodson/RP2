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
export class ResPlanService {
    private baseUrl = 'api/resPlans';

    RESPLANS: IResPlan[]; 

    constructor(private http: Http) { 
        this.RESPLANS  = [
        //     {
        //     "resUID": "1",
        //     "resName": "Carey Gower",
        //     "org": {
        //         "location": "Nashville",
        //         "title": "Director",
        //         "manager": "Brady"
        //     },
        //     "projects": [
        //         {
        //             "projUid": "1",
        //             "projName": "Data Center Consolidation",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80"
        //             }
        //             ]
        //         },
        //          {
        //             "id": "2",
        //             "name": "Windows Upgrade",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80.5"
        //             }
        //             ]
        //         },
        //          {
        //             "id": "3",
        //             "name": "Server Upgrades",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "45.5"
        //             }
        //             ]
        //         },
        //         {
        //             "id": "4",
        //             "name": "Payment Processing Upgrade",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80"
        //             }
        //             ]
        //         }
        //     ]
        // },
        //    {
        //     "id": "2",
        //     "name": "John Goodson",
        //     "org": {
        //         "location": "Nashville",
        //         "title": "Cons Engr",
        //         "manager": "Ronnie"
        //     },
        //     "projects": [
        //         {
        //             "id": "1",
        //             "name": "Data Center",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80"
        //             }
        //             ]
        //         },
        //          {
        //             "id": "2",
        //             "name": "Windows Upgrade",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80.5"
        //             }
        //             ]
        //         },
        //          {
        //             "id": "3",
        //             "name": "Server Upgrades",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "45.5"
        //             }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     "id": "3",
        //     "name": "Joe Colstad",
        //     "org": {
        //         "location": "Nashville",
        //         "title": "PS Admin",
        //         "manager": "Ronnie"
        //     },
        //     "projects": [
        //         {
        //             "id": "1",
        //             "name": "Project XYZ for Joe Colstad",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80"
        //             }
        //             ]
        //         },
        //         {
        //             "id": "2",
        //             "name": "Project 123 - Joe Colstad",
        //             "intervals": [
        //                 {
        //                 "intervalName": "jan",
        //                 "intervalValue": "40"
        //             },
        //             {
        //                 "intervalName": "feb",
        //                 "intervalValue": "80"
        //             },
        //             {
        //                 "intervalName": "mar",
        //                 "intervalValue": "80"
        //             }
        //             ]
        //         }
        
        //     ]
        // }
        ]
    }

    getResPlans(): Observable<IResPlan[]> {
        return Observable.of(this.RESPLANS)
    }
    getResPlans___(): Observable<IResPlan[]> {
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

    saveResPlans(_resPlans: [IResPlan]): Observable<IResPlan[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       // ;
        var results: Array<Observable<IResPlan>> = [];
        for(var i=0;i<_resPlans.length;i++)
            {
             results.push(this.updateResPlan(_resPlans[i],options));
            }
        return Observable.forkJoin(results);
    }

    private createResPlan(resPlan: IResPlan, options: RequestOptions): Observable<IResPlan> {
        resPlan.resource.resUid = undefined;
        return this.http.post(this.baseUrl, resPlan, options)
            .map(this.extractData)
            .do(data => console.log('createresPlan: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    private updateResPlan(resPlan: IResPlan, options: RequestOptions): Observable<IResPlan> {
        console.log('entering updateResPlan ')
        const url = `${this.baseUrl}/${resPlan.resource.resUid}`;
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
            resource: null,
            projects: []
        };
    }

    
    

    

    
}


