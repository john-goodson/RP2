import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResource, Resource,Config } from '../resourcePlans/res-plan.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {ConfigService} from "./config-service.service"
declare var $: any;
@Injectable()
export class ResourceService {
 
  constructor(private http: Http,private _configSvc:ConfigService) {
      this.config = _configSvc.config;
   }
  config: Config;
  getResources() : Observable<IResource[]>
  {
    let headers = new Headers();
    headers.append('accept', 'application/json;odata=verbose')
    let options = new RequestOptions({
        withCredentials: true,
        headers
    })
    let pwaPath = `${this.config.projectServerUrl}/`
    let adapterPath = pwaPath + "_layouts/15/PwaPSIWrapper/PwaAdapter.aspx";
    let body = {
        method: 'PwaGetResourcesCommand'
    }
    console.log("====================================Hitting Adapter get projects = ")
    return Observable.fromPromise($.ajax({
        url: adapterPath,
        type: 'POST',
        dataType: "json",
        data: body
    })) .map((result: Object[]) => {
        var resources: IResource[] = [];
        for (var i = 0; i < result.length; i++) {
            var newResource = new Resource(result[i]["resUid"], result[i]["resName"]);
            newResource.rbs = result[i]["CustomFields"].find(p=>p.Name == "RBS").Value;
            resources.push(newResource);
        }
        return resources;
    })
    
            
  }


}
