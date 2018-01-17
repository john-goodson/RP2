import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpResponse } from '@angular/common/http'
//import { HttpCache } from './httpCache' 
import { Observable } from 'rxjs'


@Injectable()
export class CachingInterceptorService implements HttpInterceptor {
  constructor() { }

  private cache = {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    // Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.

    // 
    // if (req.method !== 'GET') {
    //   console.log('******************************* ' )
    //   console.log('hey....this wasn\'t a GET' )
    //   console.log('******************************* ' )
    //   return next.handle(req);
    // }
    
    //If Request body has parameter method = PwaGetProjectsForEditCommand or PwaGetResourcesCommand
    if (req && req.body && (typeof req.body == typeof "") && (req.body.indexOf('method=PwaGetProjectsForEditCommand') > -1 || req.body.indexOf('method=PwaGetResourcesCommand')
    > -1 || req.body.indexOf('method=PwaGetTimsheetsCommand') > -1
  ) 
  
  ) {
    // First, check the cache to see if this request exists.
      const cachedResponse = this.cache[req.urlWithParams + req.body] || null;
      if (cachedResponse) {
        // A cached response exists. Serve it instead of forwarding
        // the request to the next handler.
        
        console.log('******************************* ')
        debugger;
        console.log('YO....i\'m returning cached data for' + req.body)
        console.log('******************************* ')
        return Observable.of(cachedResponse);
      }
    }

      // No cached response exists. Go to the network, and cache
      // the response when it arrives.
      return next.handle(req).do(event => {
        // Remember, there may be other events besides just the response.
        
        console.log('******************************* ')
        console.log('YO....i\'m returning new data from server....  ')
        console.log('******************************* ')
        if (event instanceof HttpResponse) {
          // Update the cache.
          this.cache[req.urlWithParams + req.body] = event;
        }
      });
    }
  
}