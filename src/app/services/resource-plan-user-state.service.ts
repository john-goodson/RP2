import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs';

import { IResPlan, ResPlan, IProject, Project, WorkUnits,Timescale, IIntervals, Interval } from '../resourcePlans/res-plan.model'

@Injectable()
export class ResourcePlanUserStateService {

    constructor(private http: Http) { }

    getUniqueProjects(): Observable<IProject[]> {
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs'
        let filter = "$filter=ResourceManagerUID eq '8181FE64-E261-E711-80CC-00155D005A03'";
        //1. get data from SP List UserState  
        return this.http.get(baseUrl + '?' + filter + '&' + select, options)

            .switchMap((data: Response) => data.json().d.results)
            .pluck('ProjectUIDs')
            .map((projectUid: string) => {
                 return JSON.parse(projectUid).map(project => { return  new Project(project.projUid,project.projName) })
            })
            .distinct(x => x.projUid)
        //.do(data => console.log('getUserState from REST: ' + JSON.stringify(data)))
    }


    getResPlans(): Observable<IResPlan[]> {
        return this.getUniqueProjects().switchMap(projects => {
            return this.getResPlansFromProjects(projects);
        });
    }

    getResPlansFromProjects(projects: IProject[]): Observable<IResPlan[]> {
        return Observable.from(projects).flatMap((project:IProject) => {
            return this.getResPlan('http://foo.wingtip.com/PWA', project, '2017-06-01', '2017-08-01', WorkUnits.FTE, Timescale.months)

        }).toArray().flatMap(t => t).
            groupBy(t => { return t.resName }).flatMap(group => {
                return group.reduce(function (a, b) {
                    a.projects = a.projects.concat(b.projects);
                    return a; // returns object with property x
                })
                  
            }).toArray()
    }

    getResPlan(projectUrl: string = 'http://foo.wingtip.com/PWA', project: IProject, start: string = '2017-06-01', end: string = '2017-08-01', workUnits: WorkUnits, timescale: string)
        : Observable<IResPlan> {
        console.log('entering getResPlans method');
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let baseUrl = `${projectUrl}/_api/ProjectServer/Projects('${project.projUid}')/GetResourcePlanByUrl(start='${start}',end='${end}',scale='${timescale}')/Assignments`;
        let select = '$select=ProjectId,ProjectName'
        let filter = "$filter=ProjectActiveStatus ne 'Cancelled'";


        let ob = this.http.get(baseUrl, options);
        return ob.switchMap(response => response.json().d.results)
            .flatMap((response: Object) => {
                var p = new Project(project.projUid,project.projName);
                var resPlan = new ResPlan(response["Id"], response["Name"], [p]);
                var uri = response["Intervals"].__deferred.uri;
                var innerOb = this.http.get(uri, options);
                return innerOb.map(response => {
                    var intervals = response.json().d.results;
                    intervals.forEach(element => {

                        var interval = new Interval(element["Name"], element["Duration"]);
                        p.intervals.push(interval);
                    });

                    return resPlan;
                })
            });
    }



}
