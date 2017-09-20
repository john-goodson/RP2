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


    getUniqueProjectsForResources(resUids: string[]): Observable<IProject[]> {

        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs'

        let filter = ''
        if (resUids && resUids.length > 0) {
            let filterstring = resUids.map(t => "ResourceUID0 eq '" + t + "'").join('or ')
            filter = `$filter=${filterstring}`;
        }
        //1. get data from SP List UserState 
        let url = baseUrl + '?' + select + '&' + filter;
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

    getUniqueProjectsAcrossResMgrs(resources: IResource[]): Observable<IProject[]> {

        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs'
        let filter = "$filter=ResourceManagerUID ne '8181FE64-E261-E711-80CC-00155D005A03'";
        //1. get data from SP List UserState 
        let url = baseUrl + '?' + filter + '&' + select;
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })

        // get unique project Uids from  from SP List UserState for all res managers that have resources
        //contained by current Res Manager
        return this.http.get(url, options)
            .switchMap((data: Response) => data.json().d.results)
            .filter((t: Object) => {
                return (resources.map(r => r.resUid).find(f => f.toUpperCase() == t["ResourceUID0"].toUpperCase()) != null)
            })
            .pluck('ProjectUIDs')
            .map((projectUid: string) => {
                return JSON.parse(projectUid).map(project => { return new Project(project.projUid, project.projName) })
            })
            .distinct(x => x.projUid)
    }

    getProjectIdsFromAssignmentsForResources(resources: IResource[]): Observable<IProject[]> {
        let baseUrl = "http://foo.wingtip.com/PWA/_api/ProjectData/Assignments";
        let select = "ProjectId,ProjectName";
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        console.log('=======================hitting project server for assigments')
        return Observable.from(resources).flatMap(t => {
            let filter = `ResourceName eq '${t.resName}' and AssignmentType eq 101`
            let url = baseUrl + '?' + filter + '&' + select;
            // get unique project Uids from PS where the current resource has access to
            //and project has resource plan assignments

            return this.http.get(url, options)
                .switchMap((data: Response) => data.json().d.results)
                .map(p => new Project(p["ProjectId"], p["ProjectName"]))
                .filter(t => {

                    return t.projUid != 'd9621fef-5c96-e711-80cc-00155d005a03'
                })

        }).toArray()
            .do(t => console.log('projects user has access on=' + JSON.stringify(t)))


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
        let resMgrUid = '8181FE64-E261-E711-80CC-00155D005A03'
        var uniqueProjectsForResMgr = this.getUniqueProjectsForResManager();
        var resourceForResMgr = this.getUniqueResourcesForResManager(resMgrUid);

        var uniqueProjectsForAllResMgr = resourceForResMgr.flatMap(resources => this.getUniqueProjectsAcrossResMgrs(resources));
        var uniqueProjectsResMgrHasAccessOn = resourceForResMgr.flatMap(resources => this.getProjectIdsFromAssignmentsForResources(resources));
        var mergedProjects = uniqueProjectsForResMgr.merge(uniqueProjectsForAllResMgr);

        let projectsWithreadOnlyFlag = mergedProjects.flatMap(val => {

            return uniqueProjectsResMgrHasAccessOn.flatMap(projectsWithRights => {
                return val.map(x => {
                    if (projectsWithRights.find(k => k.projUid.toUpperCase() == x.projUid.toUpperCase()) == null) {
                        x.readOnly = false;
                    }
                    else {
                        x.readOnly = true;
                    }
                    return x;
                })
            })
        }).toArray()
        return this.getUniqueResourcesForResManager(resMgrUid).flatMap(resources => {
            debugger;
            return projectsWithreadOnlyFlag.flatMap(projects => 
                this.getResPlansFromProjects(resources, projects).do(t => {
                    console.log('resource plans read from add resource =' + JSON.stringify(t))
                }))
                .do(t => {
                    console.log('projects passed in =' + JSON.stringify(t))
                })
        })

    }

    ///Add Resource Plan use case
    getResPlansFromResources(resources: IResource[]): Observable<IResPlan[]> {
        debugger;
        let resMgrUid = '8181FE64-E261-E711-80CC-00155D005A03'
        let projectsForAllResources = this.getUniqueProjectsAcrossResMgrs(resources);
        let projectsThatUserHasAccessOn = this.getProjectIdsFromAssignmentsForResources(resources);

        let allProjectsWithReadOnlyFlags = projectsForAllResources.flatMap(projectsForResource => {
            return projectsThatUserHasAccessOn.flatMap(projectsWithrights => {
                return projectsForResource.map(x => {
                    if (projectsWithrights.find(k => k.projUid.toUpperCase() == x.projUid.toUpperCase()) != null) {
                        x.readOnly = false;
                    }
                    else {
                        x.readOnly = true;
                    }
                    return x;
                })
            })
        }).toArray()
        var readableProjects = allProjectsWithReadOnlyFlags
            .map(t => {
                return t.filter(project => project.readOnly == false)
            })
            .do(allProjects => {

                this.AddResourceToManager(resMgrUid, resources, allProjects);
            });
        var readOnlyProjects = allProjectsWithReadOnlyFlags.map(t => { return t.filter(project => project.readOnly == true) })
        var readableResPlans = readableProjects.flatMap(projects => {
            return this.getResPlansFromProjects(resources, projects).filter((r: IResPlan[]) => {
                debugger;
                return r.find(x => { 
                    return resources.map(p => p.resUid.toUpperCase()).indexOf(x.resource.resUid.toUpperCase()) > -1 
                }) != null
            })

        });
        var readOnlyResPlans = readOnlyProjects.flatMap(resources=>
        {
            return this.getReadOnlyResPlans(readOnlyResPlans);
        })
        return allProjectsWithReadOnlyFlags.flatMap(t => {

            return readableResPlans.merge(readOnlyResPlans);
        })
    }
    public getReadOnlyResPlans(readOnlyProjects: Observable<IProject[]>): Observable<IResPlan[]> {
        let baseUrl = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

        //remember to change UID0 to UID
        let select = '$select=ResourceManagerUID,ResourceUID0,ProjectUIDs,su3i'
        let filter = "$filter=ResourceManagerUID ne '8181FE64-E261-E711-80CC-00155D005A03'";
        //1. get data from SP List UserState 
        let url = baseUrl + '?' + filter + '&' + select;
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })

        // get unique project Uids from  from SP List UserState for all res managers that have resources
        //contained by current Res Manager
        return readOnlyProjects.flatMap(readOnly => {
            return this.http.get(url, options)
                .switchMap((data: Response) => data.json().d.results)
                .map((data: Object) => {

                    let projects: IProject[] = JSON.parse(data['ProjectUIDs']).map(project => { return new Project(project.projUid, project.projName) })
                    let readOnlyFilteredProjects = projects.filter(p => readOnly.map(r => r.projUid).indexOf(p.projUid) > -1)
                    return new ResPlan(new Resource(data["ResourceUID0"], data["ResourceName"]), readOnlyFilteredProjects.map(readOnlyPojectsForResource => readOnlyPojectsForResource))
                })
                .groupBy(t => { return t.resource.resUid.toUpperCase() }).flatMap(group => {
                    return group.reduce(function (a, b) {
                        a.projects = a.projects.concat(b.projects);
                        return a; // returns object with property x
                    })

                }).toArray()
        })
    }
    public AddResourceToManager(resMgrUid: string, resources: IResource[], projects: IProject[]) {

    }

    getResPlansFromProjects(resources: IResource[], projects: IProject[]): Observable<IResPlan[]> {
        let emptyResPlans = Observable.of(resources.map(r=>new ResPlan(r,[])))
        return Observable.from(projects).flatMap((project: IProject) => {
            return this.getResPlan(resources, 'http://foo.wingtip.com/PWA', project, '2017-06-01', '2017-08-01', WorkUnits.FTE, Timescale.months)

        }).toArray()
        .merge(emptyResPlans)
        .flatMap(t => t).
            groupBy(t => { return t.resource.resUid.toUpperCase() }).flatMap(group => {
                return group.reduce(function (a, b) {
                    a.projects = a.projects.concat(b.projects);
                    return a; // returns object with property x
                })

            }).toArray()
    }

    getResPlan(resources: IResource[], projectUrl: string = 'http://foo.wingtip.com/PWA', project: IProject, start: string = '2017-06-01', end: string = '2017-08-01', workUnits: WorkUnits, timescale: string)
        : Observable<IResPlan> {
        console.log('entering getResPlans method');
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let baseUrl = `${projectUrl}/_api/ProjectServer/Projects('${project.projUid}')/GetResourcePlanByUrl(start='${start}',end='${end}',scale='${timescale}')/Assignments`;
        let expand = "$expand=Intervals,Resource/Id"
        let resUid = '8181FE64-E261-E711-80CC-00155D005A03'
        //            let filter = '$filter=' + resources.map((k:IResource)=>k.resUid).map(t=>"Resource/Id eq '" + t ).join(" or ")
        return this.http.get(baseUrl + '?' + expand, options).switchMap(response => response.json().d.results)
            .map((response: Object) => {
                var p = new Project(project.projUid, project.projName);
                p.readOnly = project.readOnly;
                let resUid = response["Resource"]["Id"];
                var resPlan = new ResPlan(new Resource(resUid, response["Name"]), [p]);
                var intervals = response["Intervals"]["results"];
                intervals.forEach(element => {

                    var interval = new Interval(element["Name"], element["Duration"]);
                    p.intervals.push(interval);
                });

                return resPlan;
            }).filter((t: IResPlan) => 
            {
                debugger;
               return resources.find(k => k.resUid.toUpperCase() == t.resource.resUid.toUpperCase()) != null
            })

    }



}

