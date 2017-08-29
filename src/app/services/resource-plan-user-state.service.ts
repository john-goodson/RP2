import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs/Rx';

import { IResPlan,ResPlan } from '../resourcePlans/res-plan.model'

@Injectable()
export class ResourcePlanUserStateService {        

    constructor(private http: Http) {}

    getUserState():  Observable<IResPlan> {
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs'
        //   return this.http.get(baseUrl + filter + '&' + select, options)

        let filter = "$filter=ResourceManagerUID eq '8181FE64-E261-E711-80CC-00155D005A03'";
         return this.http.get(baseUrl + '?' + filter + '&' + select , options)
        .mergeMap((res: Response) => {
             return Observable.from(res.json().d.results)
            .map((resPlan:Object) => {
                return new ResPlan(resPlan["ResourceUID0"],'',resPlan['ProjectUIDs'].split('|'));
            })
        })
        .do(data => console.log('getUserState from REST: ' + JSON.stringify(data)))

    //     flatMap(e => loadWithFetch("movies.json"))
    //     .subscribe(
    //        renderMovies,
    //        e => console.log(`error: ${e}`),
    //        () => console.log("complete")
    //    );

    }

}
        
