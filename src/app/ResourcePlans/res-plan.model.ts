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
  intervals?: IIntervals[];
}

export interface IIntervals {

  intervalName: string;
  intervalValue: string;
}


export class ResPlan implements IResPlan {

  constructor(public resource =new Resource('0',''),

    public projects = [])
  { }
}

export class Project implements IProject {

  constructor(public projUid = '', public projName = 'boo', public readOnly = false, public intervals = []

  ) { }
}

export class Interval implements IIntervals {

  constructor(public intervalName = '',
    public intervalValue = '',
  ) { }

}

export class Resource implements IResource {
  constructor(public resUid = '0', public resName = '')
  { }
}

export enum ProjectActiveStatus {
  inProgress,
  completed,
  cancelled
}
export enum Timescale {
  months = "Months",
  financialMonths = 'FinancialMonths',
  years = 'Years'
}
export enum WorkUnits {
  hours = 'Hours',
  days = 'Days',
  FTE = 'FTE'
}

export interface IDept {
  deptName: string;
}

