import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'
import { Observable } from 'rxjs/Rx';

import { IProject, Project } from '../resourcePlans/res-plan.model'
import {ConfigService} from "./config-service.service"

@Injectable()
export class ProjectService {

    private url: string = 'api/dataservice/';
    public projects: IProject[];
    constructor(private http: Http,private _confiSvc:ConfigService) {
        //let observer = this.getProjects().subscribe(values => this.projects = values);
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
        

        let baseUrl = `${this._confiSvc.config.projectServerUrl}/_api/ProjectData/Projects?`
        let select = '$select=ProjectId,ProjectName,ProjectOwnerName,ProjectChargeBackCategory'
        let filter = "" ///$filter=ProjectActiveStatus ne 'Cancelled'";
        return this.http.get(baseUrl + filter + '&' + select, options)
            .map((res: Response) => {
                
                //this.projects = <IProject[]>res.json().d.results;
                return <Object[]>res.json().d.results;
            }).map((project: Object[]) => {
                var projects: IProject[] = [];
                for (var i = 0; i < project.length; i++) {
                    var newProject = new Project(project[i]["ProjectId"], project[i]["ProjectName"]);
                    newProject.owner = project[i]["ProjectOwnerName"];
                    newProject.projectChargeBackCategory =  project[i]["ProjectChargeBackCategory"];
                    projects.push(newProject);
                }

                return projects;
            })
            .catch(this.handleError);
    }
}