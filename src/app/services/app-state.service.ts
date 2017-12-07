import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject"
@Injectable()
export class AppStateService {
  private loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();
  constructor() { }
  loading(value:boolean) {
    this.loadingSource.next(value);
  }
  public getCurrentYear() { 
    return 'hello world'
  }
}
