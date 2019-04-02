import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.SessionToken) {
            if (request.method.toLowerCase() === 'post') {
                if (request.body instanceof FormData) {
                    request = request.clone({
                        setHeaders: { Authorization: `Bearer ${currentUser.token}` },
                        body: request.body.append('SessionToken', currentUser.SessionToken)
                    })
                }
            } else if (request.method.toLowerCase() === 'get') {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${currentUser.token}` },
                    params: request.params.set('SessionToken', currentUser.SessionToken)
                });
            }
        } else {
            request = request.clone({ setHeaders: { Authorization: `Bearer ` } });
        }
        return next.handle(request);
    }
}