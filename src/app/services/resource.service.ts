import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResource, Resource } from '../resourcePlans/res-plan.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {ConfigService} from "./config-service.service"
@Injectable()
export class ResourceService {

  constructor(private http: Http,private _configSvc:ConfigService) { }

  getResources() : Observable<IResource[]>
  {
    let baseUrl = `${this._configSvc.config.projectServerUrl}/_api/ProjectData/Resources`

        //remember to change UID0 to UID
        let select = '$select=ResourceId,ResourceName'
        let filter = '$filter=ResourceIsActive eq true';
        //1. get data from SP List UserState 
        let url =  baseUrl + '?' + filter + '&' + select;
         let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })

//1. get data from project server Resource REST api  
        return this.http.get(url, options)
            .switchMap((data: Response) => data.json().d.results)
            .map((resource: Object) => {
                 return new Resource(resource["ResourceId"],resource["ResourceName"])
            }).toArray()
            
  }


}
