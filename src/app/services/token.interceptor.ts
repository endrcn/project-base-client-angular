import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("pb_token")}`
      }
    });
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response and headers you want
        if (event.headers.get("authorization")) {
          let data: any = decode(event.headers.get("authorization") || "");
          if (data['exp']) {/* EXPIRE ALANI */

            if (new Date(data['exp'] * 1000) > new Date()) {
              this.auth.saveToLocal("pb_token", event.headers.get("authorization"));
            } else {
              console.log("CHROME(OR EXTENSION) ISSUE, CHROME CACHES OLD AUTHORIZATION DATA", event.headers.get("authorization"))
            }
          } else {
            console.log("EXPIRE ALANI GÖNDERİLMEDİ", event.headers.get("authorization"))
          }
        }
      }
      return event;
    }));
  }
}
