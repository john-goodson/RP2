export interface IResPlan {
  id: number;
  name: string;

  org?: {
    location: string;
    title: string;
    manager: string;
  };

  projects: IProject[]; 
}

export interface IProject {
  id: number;
  name: string;
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

    constructor(public id = 0,
        public name = '',
    
        public projects = [] )
  { }
}

export class Project implements IProject{

    constructor(public id = 0,public name='boo',public intervals=[]
      
 ) { }
}

export class Interval implements IIntervals{

    constructor(public intervalName = '',
        public intervalValue = '',
 ) { }
}

export enum ProjectActiveStatus {
    inProgress,
    completed,
    cancelled
  }

  export interface IDept {
     deptName: string;
   }

