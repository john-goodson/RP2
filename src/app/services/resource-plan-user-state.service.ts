import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs';

import { IResPlan, ResPlan, IProject, Project, WorkUnits, Timescale, IIntervals, Interval, IResource, Resource } from '../resourcePlans/res-plan.model'

@Injectable()
export class ResourcePlanUserStateService {

    constructor(private http: Http) { }


    getResourcePlan(resUid: string): Observable<IResPlan> {
        //read sharePoint list
        //load up project data
        let resMgrUid = '8181FE64-E261-E711-80CC-00155D005A03'
            return this.getUniqueProjectsForResource(resUid).switchMap(projects => {
                return this.getResPlansFromProjects(projects).mergeAll()
            }).map(t => t).
                groupBy(t => { return t.resName }).flatMap(group => {
                    return group.reduce(function (a, b) {
                        a.projects = a.projects.concat(b.projects);
                        return a; // returns object with property x
                    })

                }).filter(t => t.resName == 'nishant');
    }

    getUniqueResourcesForResManager(resUid: string): Observable<IResource[]> {
        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceUID0,su3i'
        let filter = `$filter=ResourceManagerUID eq '${resUid}'`;
        //1. get data from SP List UserState 
        let url = baseUrl + '?' + filter + '&' + select;
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })

        return this.http.get(url, options)
            .switchMap((data: Response) => data.json().d.results)
            .map((result: Object) => {
                console.log("Unique Resource got=" + JSON.stringify(new Resource(result["ResourceUID0"], result["su3i"])))
                return new Resource(result["ResourceUID0"], result["su3i"])
                
            }).toArray();

    }


    getUniqueProjectsForResource(resUid: string): Observable<IProject[]> {

        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs'
        let filter = `$filter=ResourceUID0 eq '${resUid}'`;
        //1. get data from SP List UserState 
        let url = baseUrl + '?' + filter + '&' + select;
        return this.getProjectListFromSpList(url);
        //.do(data => console.log('getUserState from REST: ' + JSON.stringify(data)))
    }

    getUniqueProjectsForResManager(): Observable<IProject[]> {

        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs'
        let filter = "$filter=ResourceManagerUID eq '8181FE64-E261-E711-80CC-00155D005A03'";
        //1. get data from SP List UserState 
        let url = baseUrl + '?' + filter + '&' + select;
        return this.getProjectListFromSpList(url);
        //.do(data => console.log('getUserState from REST: ' + JSON.stringify(data)))
    }

    getProjectListFromSpList(url): Observable<IProject[]> {
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })

        //1. get data from SP List UserState  
        return this.http.get(url, options)

            .switchMap((data: Response) => data.json().d.results)
            .pluck('ProjectUIDs')
            .map((projectUid: string) => {
                return JSON.parse(projectUid).map(project => { return new Project(project.projUid, project.projName) })
            })
            .distinct(x => x.projUid)
    }


    getResPlans(): Observable<IResPlan[]> {
        let resUid = '8181FE64-E261-E711-80CC-00155D005A03'
            return this.getUniqueProjectsForResManager().switchMap(projects => {
                return this.getResPlansFromProjects(projects);
            })
    }

    getResPlansFromProjects(projects: IProject[]): Observable<IResPlan[]> {
        return Observable.from(projects).flatMap((project: IProject) => {
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
         let expand = "$expand=Intervals,Resource"
         let resUid = '8181FE64-E261-E711-80CC-00155D005A03'
        return this.getUniqueResourcesForResManager(resUid).flatMap(resources=>{
//            let filter = '$filter=' + resources.map((k:IResource)=>k.resUid).map(t=>"Resource/Id eq '" + t ).join(" or ")
            debugger;
        return this.http.get(baseUrl + '?' + expand, options).switchMap(response => response.json().d.results)
            .map((response: Object) => {
                var p = new Project(project.projUid, project.projName);
                let resUid = response["Resource"]["Id"];
                var resPlan = new ResPlan(resUid, response["Name"], [p]);
                debugger;
                var intervals = response["Intervals"]["results"];
                    intervals.forEach(element => {

                        var interval = new Interval(element["Name"], element["Duration"]);
                        p.intervals.push(interval);
                    });

                    return resPlan;
                }).filter((t:IResPlan) => resources.find(k=>k.resUid.toUpperCase() == t.resUid.toUpperCase()) != null) 
                 })
    }

       

}

