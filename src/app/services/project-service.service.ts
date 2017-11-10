import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'
import { Observable } from 'rxjs/Rx';

import { IProject, Project,Config } from '../resourcePlans/res-plan.model'
import {ConfigService} from "./config-service.service"
declare var $: any;
@Injectable()
export class ProjectService {

    private url: string = 'api/dataservice/';
    public projects: IProject[];
    config: Config;
    constructor(private http: Http,private _configSvc:ConfigService) {
        //let observer = this.getProjects().subscribe(values => this.projects = values);
        this.config = this._configSvc.config;
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    getProjects(): Observable<IProject[]> {
        console.log('getProjects method called')
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let pwaPath = `${this.config.projectServerUrl}/`
        let adapterPath = pwaPath + "_layouts/15/PwaPSIWrapper/PwaAdapter.aspx";
        let body = {
            method: 'PwaGetProjectsForEditCommand'
        }
        console.log("====================================Hitting Adapter get projects = ")
        return Observable.fromPromise($.ajax({
            url: adapterPath,
            type: 'POST',
            dataType: "json",
            data: body
        }))
            .map((project: Object[]) => {
                var projects: IProject[] = [];
                for (var i = 0; i < project.length; i++) {
                    var newProject = new Project(project[i]["projUid"], project[i]["projName"]);
                    newProject.owner = project[i]["CustomFields"].find(p=>p.Name == "Owner").Value;
                    newProject.projectChargeBackCategory =  project[i]["CustomFields"].find(p=>p.Name == "Project ChargeBack Category").Value
                    projects.push(newProject);
                }

                return projects;
            })
            .catch(this.handleError);
    }
}