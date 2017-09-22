export interface IResPlan {
  resource: IResource
  projects?: IProject[];
}

export interface IResource {
  resUid: string;
  resName?: string;

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
}


export class ResPlan implements IResPlan {

  constructor(public resource:IResource =new Resource('0',''),

    public projects:IProject[] = [])
  { }
}

export class Project implements IProject {

  constructor(public projUid = '', public projName = 'boo', public readOnly = false, public intervals:IInterval[] = []

  ) { }
}

export class Interval implements IInterval {

  constructor(public intervalName = '',
    public intervalValue = '',
  ) { }

}

export class Resource implements IResource {
  constructor(public resUid = '0', public resName = '')
  { }
}


export enum ProjectActiveStatus {
  inProgress='inProgress',
  completed='completed',
  cancelled='cancelled'
}
export enum Timescale {
    days = 3, 
    weeks = 4, 
    months = 5, 
    quarters = 6,
    years = 7,
    financialMonths =8
}
export enum WorkUnits {
  hours = 'Hours',
  days = 'Days',
  FTE = 'FTE'
}

export interface IDept {
  deptName: string;
}

