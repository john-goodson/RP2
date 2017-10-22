export interface IResPlan {
  resource: IResource
  projects?: IProject[];
}

export interface IResource {
  resUid: string;
  resName?: string;
  rbs? : string
  org?: {
    location: string;
    title: string;
    manager: string;
  };
}

export interface IProject {
  projUid: string;
  projName: string;
  readOnly: boolean;
  owner?:string,
  projectChargeBackCategory?:string,
  projProperties?: {
    owner: string;
    startDate: Date;
    finishDate: Date;
    projActiveStatus: ProjectActiveStatus;
    departments?: IDept[];
  };
  intervals?: IInterval[];
}
export interface IInterval {

  intervalName: string;
  intervalValue: string;
  start:Date
  end:Date
}


export class ResPlan implements IResPlan {

  constructor(public resource:IResource =new Resource('0',''),

    public projects:IProject[] = [])
  { }
}


export class Project implements IProject {

  constructor(public projUid = '', public projName = 'boo', public readOnly = false, public intervals:IInterval[] = []
  ,public owner='',public projectChargeBackCategory=''

  ) { }
}

export class Interval implements IInterval {

  constructor(public intervalName = '',
    public intervalValue = '',public start= new Date(),public end= new Date()
  ) { }

}

export class Resource implements IResource {
  constructor(public resUid = '0', public resName = '',public rbs='')
  { }
}


export enum ProjectActiveStatus {
  inProgress=1,
  completed=2,
  cancelled=3
}
export enum Timescale {
    days = 3, 
    weeks = 4, 
    calendarMonths = 5, 
    quarters = 6,
    years = 7,
    financialMonths =8
}
export enum WorkUnits {
  hours = 1,
  days = 2,
  FTE = 3
}

export interface IDept {
  deptName: string;
}

export class UpdateResult
{
  projectName : string;
  result:boolean;
  error:string;
}

export class Config
{
  projectServerUrl:string;
  ResPlanUserStateUrl:string;
}

