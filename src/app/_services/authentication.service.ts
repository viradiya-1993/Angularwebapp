import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { User } from '../_models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private httpOptions = { headers: new HttpHeaders().set("Content-Type", "application/json").set("apikey", environment.APIKEY) };

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(uesrname: string, password: string) {
        let detail = {
            user: uesrname, password: password, formatting: 'JSON', EmailAddress: "", SessionToken: ""
        };
        return this.http.post<any>(environment.APIEndpoint + 'login', detail, this.httpOptions).pipe(map(loginResponse => {
            console.log(loginResponse);
            if (loginResponse && loginResponse.login_response) {
                let responseType = loginResponse.login_response.Response;
                if (responseType == 'OK') {
                    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
                    this.currentUserSubject.next(loginResponse);
                    this.toastr.success('success');
                    return true;
                } else if (responseType == 'error - login failure') {
                    this.toastr.error(responseType);
                    return false;
                } else {
                    this.toastr.error(responseType);
                    console.log(loginResponse);
                    return false;
                }
            }
        }));
    }
    notLogin() {
        const currentUser = this.currentUserValue;
        if (currentUser) {
            this.router.navigate(['matters']);
            return false;
        }
        // not logged in so return true
        return true;
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['login']);
    }
   
    forgetpassword(email: string){        
        return this.http.post<any>(environment.APIEndpoint + 'Login?Request=ForgottenPassword&EmailAddress='+email,'').pipe(map(loginResponse => {
            console.log(loginResponse);
            if (loginResponse && loginResponse.login_response) {
                let responseType = loginResponse.login_response.Response;
                if (responseType == 'OK') {
                    this.toastr.success('successfully mail send');
                }
                else {
                    this.toastr.error(responseType);
                    console.log(loginResponse);
                    return false;
                }
            }
        }));
    }
}