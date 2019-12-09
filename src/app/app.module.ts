import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {
    MatButtonModule, MatPaginatorModule, MatDividerModule, MatDialogModule, MatCheckboxModule, MatTabsModule,
    MatSelectModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { PagesModule } from 'app/main/pages/pages.module';


//sorting colume Dialog
import { SortingDialogComponent, filterNames } from './main/sorting-dialog/sorting-dialog.component';
import { ReportsComponent } from './main/reports/reports.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NotFoundComponent } from './main/errors/not-found/not-found.component';
import { InternalErrorComponent } from './main/errors/internal-error/internal-error.component';




//Datepicker
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


import { LicenceAgreementComponent } from './main/licence-agreement/licence-agreement.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ChangePasswordComponent } from './main/change-password/change-password.component';
import { CKEditorModule } from 'ckeditor4-angular';
//import { AutofocusDirective } from './autofocus.directive';


//end
const appRoutes: Routes = [
    { path: '', loadChildren: './main/authentication/authentication.module#AuthenticationModule' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        SortingDialogComponent,
        filterNames,
        NotFoundComponent,
        InternalErrorComponent,
        ReportsComponent,
        LicenceAgreementComponent,
        ChangePasswordComponent,
        //AutofocusDirective,
    ],
    entryComponents: [
        SortingDialogComponent,
        ReportsComponent,
        LicenceAgreementComponent,
        ChangePasswordComponent
    ],
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CKEditorModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),

        TranslateModule.forRoot(),
        //vice detector
        DeviceDetectorModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        DragDropModule,
        MatPaginatorModule,
        MatDividerModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        // MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatTabsModule,

        //Datepicker
        SatDatepickerModule,
        SatNativeDateModule,

        // App modules
        LayoutModule,
        PagesModule,

        ToastrModule.forRoot(), // ToastrModule added
        MatProgressSpinnerModule,

    ],
    exports: [
        SortingDialogComponent,
        ChangePasswordComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ],
})
export class AppModule {
}
