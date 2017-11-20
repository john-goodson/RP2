import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpResponse} from '@angular/common/http'
//import { HttpCache } from './httpCache' 
import { Observable } from 'rxjs'


@Injectable()
export class CachingInterceptorService implements HttpInterceptor {
  constructor() {}

  private cache = {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	// Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    
    // debugger
    // if (req.method !== 'GET') {
    //   console.log('******************************* ' )
    //   console.log('hey....this wasn\'t a GET' )
    //   console.log('******************************* ' )
    //   return next.handle(req);
    // }
 
    // First, check the cache to see if this request exists.
    const cachedResponse = this.cache[req.urlWithParams + req.body] || null;
    if (cachedResponse) {
      // A cached response exists. Serve it instead of forwarding
      // the request to the next handler.
      debugger
      console.log('******************************* ' )
      console.log('YO....i\'m returning cached data ' )
      console.log('******************************* ' )
      return Observable.of(cachedResponse);
    }
 
    // No cached response exists. Go to the network, and cache
    // the response when it arrives.
    return next.handle(req).do(event => {
      // Remember, there may be other events besides just the response.
      debugger
      console.log('******************************* ' )
      console.log('YO....i\'m returning new data from server....  ' )
      console.log('******************************* ' )
      if (event instanceof HttpResponse) {
      	// Update the cache.
        this.cache[req.urlWithParams + req.body] = event;
      }
    });
  }
}