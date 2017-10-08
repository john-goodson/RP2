import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs';

import { IResPlan, ResPlan, IProject, Project, WorkUnits, Timescale, IInterval, Interval, IResource, Resource } from '../resourcePlans/res-plan.model'
declare var $: any;
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
                debugger;
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
        var mergedProjects = uniqueProjectsForResMgr.concat(uniqueProjectsForAllResMgr)

        let projectsWithreadOnlyFlag = mergedProjects.flatMap(val => {
            debugger;
            return uniqueProjectsResMgrHasAccessOn.flatMap(projectsWithRights => {
                return val.map(x => {
                    debugger;
                    if (projectsWithRights.find(k => k.projUid.toUpperCase() == x.projUid.toUpperCase()) == null) {
                        x.readOnly = true;
                    }
                    else {
                        x.readOnly = false;
                    }
                    return x;
                })
            })
        }).toArray()
        return this.getUniqueResourcesForResManager(resMgrUid).flatMap(resources => {

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

        let resMgrUid = '8181FE64-E261-E711-80CC-00155D005A03'
        let projectsForAllResources = this.getUniqueProjectsAcrossResMgrs(resources);
        let projectsThatUserHasAccessOn = this.getProjectIdsFromAssignmentsForResources(resources);
        let combinedProjects = projectsForAllResources.merge(projectsThatUserHasAccessOn);
        let allProjectsWithReadOnlyFlags = combinedProjects.flatMap(projectsForResource => {
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

        var readOnlyProjects = allProjectsWithReadOnlyFlags.map(t => { debugger; return t.filter(project => project.readOnly == true) })
        var readableResPlans = readableProjects.flatMap(projects => {
            return this.getResPlansFromProjects(resources, projects).filter((r: IResPlan[]) => {
                return r.find(x => {
                    return resources.map(p => p.resUid.toUpperCase()).indexOf(x.resource.resUid.toUpperCase()) > -1
                }) != null
            })

        })
            .do(resPlans => {
                this.AddResourceToManager(resMgrUid, resPlans).subscribe();
            });

        return readableResPlans.flatMap(x => {
            return this.getReadOnlyResPlans(resources, readOnlyProjects).flatMap(t => {

                return Observable.from(x.concat(t)).groupBy(t => {
                    return t.resource.resUid.toUpperCase()
                }).flatMap(group => {
                   debugger;
                    return group && group.key && group.reduce(function (a, b) {
                        for (var i = 0; i < b.projects.length; i++) {
                            if (a.projects.findIndex(t => t.projUid.toUpperCase() == b.projects[i].projUid.toUpperCase()) < 0)
                                a.projects = a.projects.concat(b.projects[i]);
                        }
                        return a; // returns object with property x
                    })
                })
            }).
                toArray()
        })

        // return allProjectsWithReadOnlyFlags.flatMap(t => {

        //     return readOnlyResPlans;
        // })
    }
    public getReadOnlyResPlans(resources: IResource[], readOnlyProjects: Observable<IProject[]>): Observable<IResPlan[]> {
        debugger;
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
                    return new ResPlan(new Resource(data["ResourceUID0"], data["su3i"]), readOnlyFilteredProjects.map(readOnlyPojectsForResource => readOnlyPojectsForResource))
                })
                .filter(t => resources.map(r => r.resUid.toUpperCase()).indexOf(t.resource.resUid.toUpperCase()) > -1)
                .groupBy(t => { return t.resource.resUid.toUpperCase() }).flatMap(group => {
                    return group && group.key && group.reduce(function (a, b) {
                        for (var i = 0; i < b.projects.length; i++) {
                            if (a.projects.findIndex(t => t.projUid.toUpperCase() == b.projects[i].projUid.toUpperCase()) < 0)
                                a.projects = a.projects.concat(b.projects[i]);
                        }
                        return a; // returns object with property x
                    })

                })
        }).toArray()
    }

    public getRequestDigestToken(): Observable<string> {
        let url = 'http://foo.wingtip.com/PWA/_api/contextinfo';
        let headers = new Headers();
        headers.append('Accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        return this.http.post(url, {}, options).map(response => JSON.parse(response["_body"]).d.GetContextWebInformation.FormDigestValue)
    }
    public AddResourceToManager(resMgrUid: string, resourcePlans: IResPlan[]): Observable<Response> {
        debugger;
        return this.getRequestDigestToken().flatMap(digest => {
            return Observable.from(resourcePlans).flatMap(resource => {
                let url = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"

                let headers = new Headers();
                headers.append('Accept', 'application/json;odata=verbose')
                headers.append('Content-Type', 'application/json;odata=verbose')
                headers.append('X-RequestDigest', digest)
                let options = new RequestOptions({
                    withCredentials: true,
                    headers: headers
                })
                let projects = `'[${resource.projects.map(t => '{"projUid":"' + t.projUid + '","projName":"' + t.projName + '"}').join(",")}]'`
                let body = `{"__metadata": { "type": "SP.Data.ResourcePlanUserStateListItem" },"ResourceManagerUID": "${resMgrUid}","ResourceUID0":"${resource.resource.resUid}","ProjectUIDs":${projects},"su3i": "${resource.resource.resName}"}`
                return this.http.post(url, body, options)
            })
        })
    }

    getResPlansFromProjects(resources: IResource[], projects: IProject[]): Observable<IResPlan[]> {
        let emptyResPlans = Observable.of(resources.map(r => new ResPlan(r, [])))
        return Observable.from(projects).flatMap((project: IProject) => {
            return this.getResPlan(resources, 'http://foo.wingtip.com/PWA', project, '2017-05-01', '2017-08-01', WorkUnits.FTE, Timescale.calendarMonths)

        }).toArray()
            .merge(emptyResPlans)
            .flatMap(t => t).
            groupBy(t => { return t.resource.resUid.toUpperCase() }).flatMap(group => {
                return group.reduce(function (a, b) {
                    for (var i = 0; i < b.projects.length; i++) {
                        if (a.projects.findIndex(t => t.projUid.toUpperCase() == b.projects[i].projUid.toUpperCase()) < 0)
                            a.projects = a.projects.concat(b.projects[i]);
                    }
                    return a; // returns object with property x
                })

            }).toArray().do(t => {
                debugger;
            })
    }

    getResPlan(resources: IResource[], projectUrl: string = 'http://foo.wingtip.com/PWA', project: IProject, start: string = '2017-05-01', end: string = '2017-08-01', workUnits: WorkUnits, timescale: Timescale)
        : Observable<IResPlan> {
        console.log('entering getResPlans method');
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let baseUrl = `${projectUrl}/_api/ProjectServer/Projects('${project.projUid}')/GetResourcePlanByUrl
        (start='${start}',end='${end}',scale='${timescale}')/Assignments`;
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
            })
            .merge(
            Observable.from(resources).flatMap((r: IResource) => {
                return Observable.of(new ResPlan(new Resource(r.resUid, r.resName)))
            })
            )
            .filter((t: IResPlan) => {
                return resources.find(k => k.resUid.toUpperCase() == t.resource.resUid.toUpperCase()) != null
            })

    }


    addProjects(projects: IProject[], resource: IResource, fromDate: string, toDate: string, timeScale: Timescale, workScale: WorkUnits): Observable<IProject[]> {

        let ob = Observable.from(projects).flatMap(p => {
            // return r.filter(project=>{
            //     let val = true;
            return this.addProject(p, resource, fromDate, toDate, timeScale, workScale)
            // })
        }).toArray()
        //ob.subscribe();
        return ob;
    }

    addProject(project: IProject, resource: IResource, fromDate: string, toDate: string, timeScale: Timescale, workScale: WorkUnits): Observable<IProject> {
        var success;
        //TODO
        let pwaPath = "http://foo.wingtip.com/pwa/"
        let adapterPath = pwaPath + "_layouts/15/PwaPSIWrapper/PwaAdapter.aspx";
        let body = {
            method: 'PwaAddResourcePlanCommand',
            'puid': project.projUid,
            'resuid': resource.resUid,
            'resname': resource.resName,
            'projname': project.projName,
            'user': '',
            'fromDate': fromDate,
            'toDate': toDate,
            'timeScale': this.getTimeScaleString(timeScale),
            'workScale': WorkUnits[workScale]
        }
        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        headers.append('content-type', 'application/x-www-form-urlencoded')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        return Observable.fromPromise($.ajax({
            url: adapterPath,
            type: 'POST',
            dataType: "json",
            data: body
        })).map(r => {
            debugger;
            if (r["Result"] == true) {
                this.addProjectToResMgr(project, resource)
                return project;
            }
        })
        // return this.http.post(adapterPath,body,options).flatMap(r=>
        //     {
        //         return Observable.of(project);
        //     })
    }

    addProjectToResMgr(project: IProject, resource: IResource) {

        let headers = new Headers();
        headers.append('accept', 'application/json;odata=verbose')
        let options = new RequestOptions({
            withCredentials: true,
            headers
        })
        let url = "http://foo.wingtip.com/PWA/_api/Web/Lists(guid'd6ad3403-7faf-44bb-b907-b7a689c1d97c')/Items"
        let resMgrUid = '8181FE64-E261-E711-80CC-00155D005A03'
        let filter = `?ResourceManagerUID=${resMgrUid}&su3i=${resource.resName}&$top=1`
        //1. get data from SP List UserState  
        return this.http.get(url + filter, options)

            .subscribe((data: Response) => 
            {
                debugger;
                let projects = JSON.parse(data.json().d.results[0]["ProjectUIDs"]).map(project => { return new Project(project.projUid, project.projName)})
                projects = projects.concat(project)
                 this.getRequestDigestToken().subscribe(digest => {

                    let headers = new Headers();
                    headers.append('Accept', 'application/json;odata=verbose')
                    headers.append('Content-Type', 'application/json;odata=verbose')
                    headers.append('X-RequestDigest', digest)
                    headers.append('X-HTTP-Method', 'MERGE')
                    headers.append('IF-MATCH', '*')
                    let options = new RequestOptions({
                        withCredentials: true,
                        headers: headers
                    })
                    let mergedProjects = `'[${projects.map(t => '{"projUid":"' + t.projUid + '","projName":"' + t.projName + '"}').join(",")}]'`
                    let body = `{"__metadata": { "type": "SP.Data.ResourcePlanUserStateListItem" },"ProjectUIDs":${mergedProjects}}"}`
                    return this.http.post(data.json().d.results[0].__metadata.uri, body, options).subscribe();
            })
            })

    }

    getTimeScaleString(value: Timescale): string {
        debugger;
        switch (value) {
            case Timescale.calendarMonths: return "Calendar Months";
            case Timescale.financialMonths: return "Financial Months";
            case Timescale.weeks: return "Weeks";
            default: return "";

        }
    }


}

