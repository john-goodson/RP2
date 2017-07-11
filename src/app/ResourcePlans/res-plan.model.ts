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
  intervals: IIntervals[];
}

export interface IIntervals {
 
  intervalName: string;
  intervalValue: string;
}
