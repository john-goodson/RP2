import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
@Injectable()
export class AppUtilService {

  constructor() { }
  safeUnSubscribe(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }
}
