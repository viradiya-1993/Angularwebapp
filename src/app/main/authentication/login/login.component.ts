import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService, AppPermissionsService } from '../../../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import browser from 'browser-detect';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isspiner: boolean = false;
  hide: boolean = true;
  currentYear: any;
  VERSION: any = environment.VERSION;
  ipAddress: any;
  browserData: any = browser();
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private _AppPermissionsService: AppPermissionsService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
      this.ipAddress = data.ip;
    });
    this.currentYear = new Date().getFullYear();
    // Configure the layout
    this._fuseConfigService.config = {
      layout: { navbar: { hidden: true }, toolbar: { hidden: true }, footer: { hidden: true }, sidepanel: { hidden: true } }
    };
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.authenticationService.notLogin();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  loginUser() {
    this.isspiner = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value, this.ipAddress, this.browserData.name, this.browserData.os, this.browserData.os + '/' + this.browserData.version).pipe(first()).subscribe(data => {
      if (data) {
        this.isspiner = false;
        this._AppPermissionsService.applictionSetting(JSON.parse(localStorage.getItem('Login_response')));
        setInterval(() => this.authenticationService.MaintainLicence(), 60000);
        this.router.navigate(['matters']);
      } else {
        this.isspiner = false;
      }
    }, error => {
      this.isspiner = false;
      this.toastr.error(error);
    });
  }
}
