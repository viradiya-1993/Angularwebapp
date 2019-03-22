import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { fuseConfig } from 'app/fuse-config';
//remove when apply api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from 'app/fake-db/fake-db.service';
//done api

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { PagesModule } from 'app/main/pages/pages.module';

import { fakeBackendProvider } from './_helpers';


const appRoutes: Routes = [{
    path: '', loadChildren: './main/authentication/authentication.module#AuthenticationModule'
}];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),

        TranslateModule.forRoot(),
        //remove when apply api
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        PagesModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider
    ],
})
export class AppModule {
}
