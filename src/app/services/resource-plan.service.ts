import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';

import { IResPlan } from '../resourcePlans/res-plan.model';
import { IProject } from '../resourcePlans/res-plan.model';
import { IIntervals } from '../resourcePlans/res-plan.model';

@Injectable()
export class ResourcePlanService {



  constructor( private http: Http) { }

  getResPlans(): Observable<Response> {
    console.log('entering getResPlans method');
    let headers = new Headers();
    headers.append('accept', 'application/json;odata=verbose')
    let options = new RequestOptions({
      withCredentials: true,
      headers
    })

    let baseUrl = "http://foo.wingtip.com/PWA/_api/ProjectServer/Projects('afa7fbbe-e361-e711-80cc-00155d005a03')/GetResourcePlanByUrl(start='2017-06-01',end='2017-08-01',scale='Months')/Assignments"
    let select = '$select=ProjectId,ProjectName'
    let filter = "$filter=ProjectActiveStatus ne 'Cancelled'";
 
    return this.http.get(baseUrl, options).mergeMap(( resp: Response) => {
      var results = resp.json().d.results;
      for(var i=0;i<results.length;i++)
        {
          var uri = results[i].Intervals.__deferred.uri;
           this.http.get(uri, options).subscribe((val:Response) => {debugger;return val.json()});
        }
      debugger;  return results;
    
    },)
    


  }
  // public getCurrentLocationAddress():Observable<String> {
  //   return Observable.fromPromise(Geolocation.getCurrentPosition())
  //     .map(location => location.coords)
  //     .flatmap(coordinates => {
  //       console.log(coordinates);
  //       return this.http.request(this.geoCodingServer + "/json?latlng=" + coordinates.latitude + "," + coordinates.longitude)
  //         .map((res: Response) => {
  //                      let data = res.json();
  //                      return data.results[0].formatted_address;
  //             });
  //     });
  // }

}
