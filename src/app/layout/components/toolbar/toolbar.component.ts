import { Component, OnDestroy, OnInit, ViewEncapsulation, Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import * as $ from 'jquery';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Location } from '@angular/common';
import { navigation } from 'app/navigation/navigation';
import { AuthenticationService, MainAPiServiceService, TimersService } from '../../../_services';
import { Router } from '@angular/router';
import { ContactDialogComponent } from './../../../main/pages/contact/contact-dialog/contact-dialog.component';
import { LicenceAgreementComponent } from '../../../main/licence-agreement/licence-agreement.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ContactCorresDetailsComponent } from 'app/main/pages/contact/contact-corres-details/contact-corres-details.component';
import { ReportsComponent } from 'app/main/reports/reports.component';
import { ToastrService } from 'ngx-toastr';
import { TimeEntriesComponent } from 'app/main/pages/time-entries/time-entries.component';
import { TimeEntryDialogComponent } from 'app/main/pages/time-entries/time-entry-dialog/time-entry-dialog.component';
import { MatterPopupComponent } from 'app/main/pages/matters/matter-popup/matter-popup.component';
import { MatterDialogComponent } from 'app/main/pages/time-entries/matter-dialog/matter-dialog.component';
import { ReceiptDilogComponent } from 'app/main/pages/invoice/receipt-dilog/receipt-dilog.component';
import { InvoiceDetailComponent } from 'app/main/pages/invoice/invoice-detail/invoice-detail.component';
import { SpendMoneyAddComponent } from 'app/main/pages/spend-money/spend-money-add-dialog/spend-money-add.component';
import { GeneralReceiptDilogComponent } from 'app/main/pages/receive-money/general-receipt-dilog/general-receipt-dilog.component';
import { InstantInvoiceDailogComponent } from 'app/main/pages/invoice/instant-invoice-dailog/instant-invoice-dailog.component';
import { InvoiceAddDailogComponent } from 'app/main/pages/invoice/invoice-add-dailog/invoice-add-dailog.component';
import { MatterDialogComponentForTemplate } from 'app/main/pages/template/matter-dialog/matter-dialog.component';
import { MatterReceiptDialogComponentForTemplate } from 'app/main/pages/receive-money/matter-dialog/matter-dialog.component';

import { UserDialogComponent } from './../../../main/pages/users/user-dialog/user-dialog.component';
import { ActivityDialogComponent } from './../../../main/pages/activities/activity-dialog/activity-dialog.component';
import { ChangePasswordComponent } from 'app/main/change-password/change-password.component';

import { DocumentDailogComponent } from './../../../main/pages/document-register/document-dailog/document-dailog.component';
import { EmailDailogComponent } from './../../../main/pages/template/email-templete/email-dailog/email-dailog.component';
import { PacksDailogComponent } from './../../../main/pages/template/packs/packs-dailog/packs-dailog.component';
import { ChartAcDailogComponent } from './../../../main/pages/chart-account/chart-ac-dailog/chart-ac-dailog.component';
import { SelectAccountComponent } from './../../../main/pages/select-account/select-account.component';
import { FileNoteDialogComponent } from 'app/main/pages/matters/file-note-dialog/file-note-dialog.component';
import { BankingDialogComponent } from 'app/main/pages/banking/banking-dialog.component';

import { GeneralDailogComponent } from './../../../main/pages/general-journal/general-dailog/general-dailog.component';
import { AuthorityDialogComponent } from 'app/main/pages/main-authorities/authority-dialog/authority-dialog.component';
import { ReportFilterComponent } from './../../../main/pages/general-journal/report-filter/report-filter.component';
import { ChronItemDailogComponent } from './../../../main/pages/legal-details/chronology/chron-item-dailog/chron-item-dailog.component';
import { DairyDailogComponent } from './../../../main/pages/diary/dairy-dailog/dairy-dailog.component';
import { ResumeTimerComponent } from 'app/main/pages/time-entries/resume-timer/resume-timer.component';
@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
@Injectable()
export class ToolbarComponent implements OnInit, OnDestroy {
    appPermissions: any = JSON.parse(localStorage.getItem('app_permissions'));
    @ViewChild(TimeEntriesComponent) TimeEntrieschild: TimeEntriesComponent;
    horizontalNavbar: boolean; isTabShow: number = 1; rightNavbar: boolean; hiddenNavbar: boolean; navigation: any; selectedLanguage: any; selectedIndex: number;
    currentUser: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    //timer setting
    timerId: any;
    TotalTimer: number = 0;
    prevMatterArray: any[] = [];
    timerInterval: any;
    currentTimer: any = 0;
    currentTimerHMS: any;
    ReportListObj: any[] = [];
    getContactData: any;
    detailwidth: any;
    activeSubMenu: any = '';
    isInvoice: any;
    greenTheme: any = false;
    CreatDocumentChild: any;




    // Private
    private _unsubscribeAll: Subject<any>;
    activedocument: any;
    clickedBtn: string;
    hideShowDoc: string;
    isDocumentGenerateHide: string;
    templateRoter: string;
    spendMoneyMenu: string;
    emailrouting: string;
    emailroutingtax: string;
    TemplateUrlHandel: string;


    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private authenticationService: AuthenticationService,
        private router: Router,
        public dialog: MatDialog,
        public _matDialog: MatDialog,
        private toastr: ToastrService,
        private TimersServiceI: TimersService,







        private _mainAPiServiceService: MainAPiServiceService,
        private _router: Router,
        private location: Location,
        public MatDialog: MatDialog
    ) {
        if (this.appPermissions == null) {
            this.appPermissions = [];
        }
        this.navigation = navigation;
        if (localStorage.getItem('theme_type') == "theme-yellow-light")
            this.greenTheme = true;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.router.events.subscribe((res) => {
            this.navBarSetting(this.router.url);
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.timerId = 'timer_' + this.currentUser.UserGuid;
        }
        //Report Listing
        this._mainAPiServiceService.getSetData({}, 'ReportList').subscribe(res => {
            console.log("tolbar");
            console.log(res);
            if (res.CODE == 200 && res.STATUS == 'success') {
                res.DATA.REPORTS.forEach(element => {
                    if (!this.ReportListObj[element.REPORTGROUP]) {
                        let temp = [];
                        temp.push(element);
                        this.ReportListObj[element.REPORTGROUP] = temp;
                    } else {
                        let demo = this.ReportListObj[element.REPORTGROUP]
                        demo.push(element);
                        this.ReportListObj[element.REPORTGROUP] = demo;
                    }
                });
                let demoTemp = this.ReportListObj;
                let tem: any = [];
                for (let i in demoTemp) {
                    tem[i] = chunks(demoTemp[i]);
                }
                this.ReportListObj = tem;
            }
        }, err => {
            this.toastr.error(err);
        });

        //addedby web19
        let val = localStorage.getItem('handelGenerateDoc');
        if (val == 'Folder') {
            this.hideShowDoc = 'yes';
        } else {
            this.hideShowDoc = 'no';
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {
        this.updateTimerCounter();
        this.displayMattterList();
        // Subscribe to the config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((settings) => {
            this.horizontalNavbar = settings.layout.navbar.position === 'top';
            this.rightNavbar = settings.layout.navbar.position === 'right';
            this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });
    }

    // ngAfterViewChecked() {
    ngAfterViewInit() {
        const wph = $(window).width();
        this.detailwidth = wph - 280 - 5 + 'px';

        if ($(window).width() >= 992 && $(window).width() < 1280) {

            const wph = $(window).width();
            this.detailwidth = wph - 65 + 'px';

            const nvh = 56;
            $('.mat-tab-header').css({ 'width': wph - nvh - 280 + 'px' });
        } else if ($(window).width() <= 991) {

            const wph = $(window).width();
            this.detailwidth = wph - 65 + 'px';

            const nvh = 56;
            $('.mat-tab-header').css({ 'width': wph - nvh - 160 + 'px' });
        }

        $(window).resize(function () {

            if ($(window).width() >= 992 && $(window).width() < 1280) {

                const wph = $(window).width();
                this.detailwidth = wph - 65 + 'px';

                const nvh = 56;
                $('.mat-tab-header').css({ 'width': wph - nvh - 280 + 'px' });
            } else if ($(window).width() <= 991) {

                const wph = $(window).width();
                this.detailwidth = wph - 65 + 'px';

                const nvh = 56;
                $('.mat-tab-header').css({ 'width': wph - nvh - 160 + 'px' });
            }
        });

    }


    /* ---------------------------------------------------------------------help Licence start--------------------------------------------------------------------------  */
    openLicence(Data) {
        let w = Data == 'LI' ? '50%' : '25%';
        const dialogRef = this.dialog.open(LicenceAgreementComponent, {
            disableClose: true,
            //width: w,
            data: { action: Data }
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    /* ---------------------------------------------------------------------help Licence end--------------------------------------------------------------------------  */

    /* ---------------------------------------------------------------------Contacts Start--------------------------------------------------------------------------  */
    // for new contact dialog
    ContactsDialog(actionType) {
        let contactPopupData = {};
        if (actionType == "new") {
            contactPopupData = { action: actionType };
        } else if (actionType == 'edit' || actionType == 'duplicate' || actionType == 'matter_contect') {
            if (actionType == "matter_contect") {
                let getMatterContactGuId = JSON.parse(localStorage.getItem('set_active_matters'));
                localStorage.setItem('contactGuid', getMatterContactGuId.COMPANYCONTACTGUID);
                actionType = "edit";
                if (getMatterContactGuId.COMPANYCONTACTGUID == "") {
                    this.toastr.error('CONTACTGUID not available');
                    return false;
                }
            } else if (!localStorage.getItem('contactGuid') && actionType != "matter_contect") {
                this.toastr.error("Please Select Contact");
                return false;
            }
            contactPopupData = { action: actionType }
        }
        const dialogRef = this.dialog.open(ContactDialogComponent, {
            disableClose: true, panelClass: 'contact-dialog', data: contactPopupData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                $('#refreshContactTab').click();
        });
    }

    openCorresDialog() {
        let getMatterGuId = JSON.parse(localStorage.getItem('set_active_matters'));
        const dialogRef = this.dialog.open(ContactCorresDetailsComponent, {
            disableClose: true, width: '100%', data: getMatterGuId.MATTERGUID,
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    /* ---------------------------------------------------------------------Contacts End--------------------------------------------------------------------------  */
    /* ---------------------------------------------------------------------Matter start--------------------------------------------------------------------------  */
    matterpopup(actionType) {
        let MaterPopupData = {};
        if (actionType == "new") {
            MaterPopupData = { action: actionType };
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            if (!JSON.parse(localStorage.getItem('set_active_matters'))) {
                this.toastr.error("Please Select Matter");
                return false;
            }
            let mattersData = JSON.parse(localStorage.getItem('set_active_matters'));
            MaterPopupData = { action: actionType, 'matterGuid': mattersData.MATTERGUID }
        }
        const dialogRef = this.dialog.open(MatterPopupComponent, {
            width: '100%',
            disableClose: true,
            data: MaterPopupData
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    // Delete matter Pop-up
    DeleteNewmatterpopup(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let MatterData: any = JSON.parse(localStorage.getItem('set_active_matters'));
                let postData = { FormAction: "delete", data: { MATTERGUID: MatterData.MATTERGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetMatter').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshMatterTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    //New File Note Dialog
    NewFileNote() {
        const dialogRef = this.dialog.open(FileNoteDialogComponent, { width: '100%', disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
    /* ---------------------------------------------------------------------Matter End--------------------------------------------------------------------------  */

    /* ---------------------------------------------------------------------Activity Start--------------------------------------------------------------------------  */
    //add edit and duplicat ActivityDialog
    ActivityDialog(actionType) {
        let popupData: any = {};
        if (actionType == "new") {
            popupData = { action: actionType };
        } else if (actionType == "edit" || actionType == "Duplicate") {
            let ActivityData = JSON.parse(localStorage.getItem('current_ActivityData'));
            if (!ActivityData) {
                this.toastr.error("Please Select Activity");
                return false;
            }
            popupData = { action: actionType, ACTIVITYGUID: ActivityData.ACTIVITYGUID };
        }
        const dialogRef = this.dialog.open(ActivityDialogComponent, {
            disableClose: true, panelClass: 'Activity-dialog', data: popupData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                $('#refreshActivities').click();
        });
    }

    //DeleteActivity
    DeleteActivityDialog(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let ActivityData = JSON.parse(localStorage.getItem('current_ActivityData'));
                let postData = { FormAction: "delete", data: { ACTIVITYGUID: ActivityData.ACTIVITYGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetActivity').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshActivities').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    /* ---------------------------------------------------------------------Activity End--------------------------------------------------------------------------  */


    /* ---------------------------------------------------------------------------USERS Start-------------------------------------------------------------------------  */
    userDialog(actionType) {
        let popupData: any = {};
        if (actionType == "new") {
            popupData = { action: actionType };
        } else if (actionType == "edit" || actionType == "Duplicate") {
            let ActiveUserData = JSON.parse(localStorage.getItem('current_user_Data'));
            if (!ActiveUserData) {
                this.toastr.error("Please Select User");
                return false;
            }
            popupData = { action: actionType, USERGUID: ActiveUserData.USERGUID };
        }
        const dialogRef = this.dialog.open(UserDialogComponent, { disableClose: true, panelClass: 'User-dialog', data: popupData });
        dialogRef.afterClosed().subscribe(result => { });
    }
    //DeleteUser
    DeleteUser(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
    /* ---------------------------------------------------------------------------USERS End-------------------------------------------------------------------------  */


    /* ---------------------------------------------------------------------------start of timer add-------------------------------------------------------------------------  */
    toggleSidebarOpen(key) {
        this.updateTimerCounter();
        this.displayMattterList();
        /*Keep open timer box once timer added*/
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    addTimerForMatter() {
        this.TimersServiceI.addTimeEnrtS();
    }

    displayMattterList() {
        this.prevMatterArray = [];
        if (localStorage.getItem(this.timerId)) {
            let timerObj = JSON.parse(localStorage.getItem(this.timerId));
            clearTimeout(this.timerInterval);
            timerObj.forEach(items => {
                this.prevMatterArray.push({ 'matter_id': items.matter_id, 'matterguid': items.matterguid, 'time': this.secondsToHms(items.time), 'isStart': items.isStart });
                if (localStorage.getItem('start_' + items.matter_id) && items.isStart) {
                    this.currentTimer = localStorage.getItem('start_' + items.matter_id);
                    this.startTimer(items.matter_id);
                }
            });
        }
    }

    updateTimerCounter() {
        this.prevMatterArray = JSON.parse(localStorage.getItem(this.timerId));
        if (this.prevMatterArray)
            this.TotalTimer = this.prevMatterArray.length;
    }

    /*convert Secound to HMS*/
    secondsToHms(d: any) {
        d = Number(d);
        var hours = Math.floor(d / 3600) < 10 ? ("00" + Math.floor(d / 3600)).slice(-2) : Math.floor(d / 3600);
        var minutes = ("00" + Math.floor((d % 3600) / 60)).slice(-2);
        var seconds = ("00" + (d % 3600) % 60).slice(-2);
        return hours + ":" + minutes + ":" + seconds;
    }

    stopMatterBack(matterId: any) {
        clearTimeout(this.timerInterval);
        let tempArray: any[] = []
        let timerObj = JSON.parse(localStorage.getItem(this.timerId));
        timerObj.forEach(items => {
            if (items.matter_id === matterId) {
                items.isStart = false;
                items.time = this.currentTimer;
                tempArray.push(items);
                localStorage.removeItem('start_' + items.matter_id);
            } else {
                tempArray.push(items);
            }
        });
        this.currentTimer = 0;
        localStorage.setItem(this.timerId, JSON.stringify(tempArray));
        this.prevMatterArray = tempArray;
        this.displayMattterList();
    }

    startMatterBack(matterId: any) {
        clearTimeout(this.timerInterval);
        this.currentTimer = 0;
        let tempArray: any[] = []
        let timerObj = JSON.parse(localStorage.getItem(this.timerId));
        timerObj.forEach(items => {
            if (items.isStart) {
                items.isStart = false;
                items.time = localStorage.getItem('start_' + items.matter_id);
                tempArray.push(items);
                localStorage.removeItem('start_' + items.matter_id);
            } else if (items.matter_id === matterId) {
                this.currentTimerHMS = this.secondsToHms(items.time);
                items.isStart = true;
                tempArray.push(items);
                localStorage.setItem('start_' + items.matter_id, items.time);
                this.currentTimer = items.time;
                this.startTimer(items.matter_id);
            } else {
                tempArray.push(items);
            }
        });
        localStorage.setItem(this.timerId, JSON.stringify(tempArray));
        this.prevMatterArray = tempArray;
        this.displayMattterList();
    }

    startTimer(matterId: any) {
        if (localStorage.getItem('start_' + matterId)) {
            this.timerInterval = setInterval(() => {
                this.currentTimer++;
                this.currentTimerHMS = this.secondsToHms(this.currentTimer);
                localStorage.setItem('start_' + matterId, this.currentTimer);
            }, 1000);
        }
    }

    stopTimer() {
        clearTimeout(this.timerInterval);
    }

    endMatterBack(matterId: any) {
        let AllTimer = JSON.parse(localStorage.getItem(this.timerId));
        let matterDataTime;
        for (var i = AllTimer.length - 1; i >= 0; --i) {
            if (AllTimer[i].matterguid == matterId) {
                if (localStorage.getItem('start_' + AllTimer[i].matter_id)) {
                    clearTimeout(this.timerInterval);
                    matterDataTime = this.secondsToHms(localStorage.getItem('start_' + AllTimer[i].matter_id));
                    localStorage.removeItem('start_' + AllTimer[i].matter_id);
                    this.currentTimer = 0;
                } else {
                    matterDataTime = this.secondsToHms(AllTimer[i].time);
                }
                AllTimer.splice(i, 1);
            }
        }
        localStorage.setItem(this.timerId, JSON.stringify(AllTimer));
        $('#sidebar_open_button').click();
        this.addNewTimeEntry(matterId, matterDataTime);

    }

    addNewTimeEntryNew() {
        let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
        if (matterData.ACTIVE) {
            this.addNewTimeEntry(matterData.MATTERGUID, '');
        } else {
            this.toastr.error("You cannot time entry for Inactive matter. Please select active matter and try again.");
            return false;
        }

    }
    ResumeTimePopup(){
        const dialogRef = this.dialog.open(ResumeTimerComponent, { width: '100%', disableClose: true, data: { 'edit':'', 'matterData': '' } });
        dialogRef.afterClosed().subscribe(result => {
            if (result){
            // $('#refreshTimeEntryTab').click();
            }
               
        }); 
    }


    public addNewTimeEntry(Data: any, matterData: any) {
        const dialogRef = this.dialog.open(TimeEntryDialogComponent, { width: '100%', disableClose: true, data: { 'edit': Data, 'matterData': matterData } });
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                $('#refreshTimeEntryTab').click();
        });
    }
    /* ---------------------------------------------------------------------end of timer add--------------------------------------------------------------------------  */


    //Reportpopup open
    Reportpopup(ReportData) {
        console.log(ReportData);
        let type: number;
        if (ReportData.REPORTGROUP == 'Management')
            type = 27;
        else if (ReportData.REPORTGROUP == 'Accounts')
            type = 26;
        else if (ReportData.REPORTGROUP == 'Trust')
            type = 25;
        // if (this.appPermissions[type][ReportData.REPORTNAME]) {
        const dialogRef = this.dialog.open(ReportsComponent, { width: '100%', data: ReportData, disableClose: true });
        dialogRef.afterClosed().subscribe(result => { });
        // } else {
        //     this.toastr.error('Access Denied');
        // }
    }
    // Add Spend Money Pop-up
    Addspendmoneypopup() {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(SpendMoneyAddComponent, {
            width: '100%',
            disableClose: true,
            data: {
                action: 'new'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshSpendMoneyTab').click();
            }
        });
    }
    // Edit spendmoney Pop-up
    Editspendmoneypopup() {
        let SendMoney_data = JSON.parse(localStorage.getItem('spendMoney_data'));
        if (SendMoney_data == null) {
            this.toastr.error("No Data Selected");
        } else {
            const dialogConfig = new MatDialogConfig();
            const dialogRef = this.dialog.open(SpendMoneyAddComponent, {
                width: '100%',
                disableClose: true,
                data: {
                    action: 'edit'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    $('#refreshSpendMoneyTab').click();
                }

            });
        }

    }

    // Delete matter Pop-up
    Deletespendmoneypopup(): void {
        let SendMoney_data = JSON.parse(localStorage.getItem('spendMoney_data'));
        if (SendMoney_data == null) {
            this.toastr.error("No Data Selected");
        } else {
            this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                disableClose: true,
                width: '100%',
            });
            this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
            this.confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {
                    let postData = { FormAction: "delete", DATA: { EXPENDITUREGUID: SendMoney_data.EXPENDITUREGUID } }
                    this._mainAPiServiceService.getSetData(postData, 'SetExpenditure').subscribe(res => {
                        if (res.STATUS == "success" && res.CODE == 200) {
                            $('#refreshSpendMoneyTab').click();
                            this.toastr.success('Delete successfully');
                        }
                    });
                }
                this.confirmDialogRef = null;
            });
        }

    }


    deleteContact(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let getContactGuId = localStorage.getItem('contactGuid');
                let postData = { FormAction: "delete", data: { CONTACTGUID: getContactGuId } }
                this._mainAPiServiceService.getSetData(postData, 'SetContact').subscribe(res => {
                    if (res.STATUS == "success") {
                        $('#refreshContactTab').click();
                        this.toastr.success(res.STATUS);
                    } else {
                        this.toastr.error("You Can't Delete Contact Which One Is To Related to Matters");
                    }
                });;
            }
            this.confirmDialogRef = null;
        });
    }

    deleteTimeEntry(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let WORKITEMGUID = localStorage.getItem('edit_WORKITEMGUID');
                let postData = { FormAction: "delete", data: { WorkItemGuid: WORKITEMGUID } }

                this._mainAPiServiceService.getSetData(postData, 'SetWorkItems').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshTimeEntryTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });;
            }
            this.confirmDialogRef = null;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }



    //Change Password Dialog
    ChangePass() {
        const dialogRef = this.dialog.open(ChangePasswordComponent, { disableClose: true, panelClass: 'change-password' });
        dialogRef.afterClosed().subscribe(result => {
       
        });
    }/* Document Register Module */

    DocumntPop(actionType) {
        let DcoumentPopdata = {}
        if (actionType == 'new') {
            DcoumentPopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            DcoumentPopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(DocumentDailogComponent, {
            disableClose: true,
            panelClass: 'Document-dialog',
            data: DcoumentPopdata
        });
        dialogRef.afterClosed().subscribe(result => { });
    }

    // Delete Record Document
    DeleteDocument(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
       
        });
    }

    //Open Matter Folder
    OpenMatter() {
        console.log('Matter Folder Work!!!');
    }

    //Open Document
    OpenDocument() {
        console.log('Document  Work!!!');
    }

    //Load Document
    LoadDocument() {
        console.log('Load Document Work!!!');
    }

    //PDF Document
    PdfDocument() {
        console.log('Pdf Document work!!!')
    }

    //Pdf Email Document
    PdfEmailDocument() {
        console.log('Pdf Email Document Work!!!');
    }

    /* Email Module */

    //SelectMatter 

    GenarateEmail() {
        let templateData = JSON.parse(localStorage.getItem('GenerateEmailData'));
        if (this.router.url == "/create-document/email-invoice-template") {
            let invoiceGUid = localStorage.getItem('edit_invoice_id');
            let passdata = { 'Context': "Invoice", 'ContextGuid': invoiceGUid, "Type": "Email", "Folder": '', "Template": templateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-matter-template") {
            let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
            let passdata = { 'Context': "Matter", 'ContextGuid': matterData.MATTERGUID, "Type": "Email", "Folder": '', "Template": templateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-receive-money-template") {
            let ReceiptData = JSON.parse(localStorage.getItem('receiptData'));
            let passdata = { 'Context': "Income", 'ContextGuid': ReceiptData.INCOMEGUID, "Type": "Email", "Folder": '', "Template": templateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-contact-template") {
            let ContactGuID = localStorage.getItem('contactGuid');
            let passdata = { 'Context': "Contact", 'ContextGuid': ContactGuID, "Type": "Email", "Folder": '', "Template": templateData.NAME }
            this.ForEmailDialogOpen(passdata);
        }
    }
    ForEmailDialogOpen(passdata) {
        const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, {
            width: '100%',
            disableClose: true,
            data: passdata
        });
        dialogRef.afterClosed().subscribe(result => {
         
        });
    }




    /* Email Module Function */
    EmailTempletePopUp(actionType) {
        let EmailPopdata = {}
        if (actionType == 'new') {
            EmailPopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'copy') {
            EmailPopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(EmailDailogComponent, {
            disableClose: true,
            panelClass: 'Email-dialog',
            data: EmailPopdata
        });
        dialogRef.afterClosed().subscribe(result => { });
    }

    //Delete Email
    DeleteEmailTemplete() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
          
        });
    }

    /* Packs Module Function */

    PackModule(actionType) {
        let PackPopdata = {}
        if (actionType == 'new') {
            PackPopdata = { action: actionType }
        } else {
            PackPopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(PacksDailogComponent, {
            disableClose: true,
            panelClass: 'Pack-dialog',
            data: PackPopdata
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    //DeletePack
    DeletePack(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
       
        });
    }
    SelectMatter() {
        const dialogRef = this.MatDialog.open(MatterDialogComponent, {
            width: '100%',
            disableClose: true,
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    /* Chart Of Account Module Function's */

    AccountPop(actionType) {
        let AccountPopdata = {}
        if (actionType == 'new') {
            AccountPopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            AccountPopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(ChartAcDailogComponent, {
            disableClose: true,
            panelClass: 'ChartAc-dialog',
            data: AccountPopdata
        });
        dialogRef.afterClosed().subscribe(result => { });
    }

    //DeleteAccount
    DeleteAccount(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => { });
    }


    //Authority dialoge 
    AuthorityDialog(val) {
        const dialogRef = this.dialog.open(AuthorityDialogComponent, {
            disableClose: true,
            panelClass: 'ChartAc-dialog',
            data: {
                action: val,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
    }


    deleteAuthority(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                // let getContactGuId = localStorage.getItem('contactGuid');
                // let postData = { FormAction: "delete", data: { CONTACTGUID: getContactGuId } }
                // this._getContact.AddContactData(postData).subscribe(res => {
                //     if (res.STATUS == "success") {
                //         $('#refreshContactTab').click();
                //         this.toastr.success(res.STATUS);
                //     } else {
                //         this.toastr.error("You Can't Delete Contact Which One Is To Related to Matters");
                //     }
                // });;
            }
            this.confirmDialogRef = null;
        });
    }
    //end of Authority dialoge 

    //Account Trasactions
    Account_Tra() {

    }
    //Recouncile Account
    Reconcile_ac_pra() {

    }
    //ReconcileAC
    ReconcileAC() {
        const dialogRef = this.dialog.open(SelectAccountComponent, {

        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
    }

    /* General Journal Module Function's */

    //NewGeneral
    NewGeneral() {
        const dialogRef = this.dialog.open(GeneralDailogComponent, {

        });
        dialogRef.afterClosed().subscribe(result => {
           
        });
    }
    //ViewDetails
    ViewDetails() {
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%', disableClose: true,
            data: { action: 'add' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshReceiceMoany').click();
            }
        });
    }
    //DeleteGeneral
    DeleteGeneral() {
        console.log('DeleteGeneral Work!!');
    }
    //DuplicateGeneral
    DuplicateGeneral() {
        console.log('DuplicateGeneral Work!!');
    }
    //PrintGj
    PrintGj() {
        const dialogRef = this.dialog.open(ReportFilterComponent, {

        });
        dialogRef.afterClosed().subscribe(result => {
           
        });
    }

    //PrepareReceipt
    PrepareReceipt() {
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%',
            disableClose: true,
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
           
        });
    }
    //_____________________________________________________________________________________________________

    BankingDialogOpen() {
        const dialogRef = this.dialog.open(BankingDialogComponent, {});
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    /** Chronology Module's Function's */

    //NewChron
    ChronPopup(actionType) {
        let ChronePopData = {}
        if (actionType == 'new') {
            ChronePopData = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            ChronePopData = { action: actionType }
        }
        const dialogRef = this.dialog.open(ChronItemDailogComponent, {
            disableClose: true,
            panelClass: 'Chrone-dialog',
            data: ChronePopData
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    //DeleteChron
    DeleteChron() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
           
        });
    }

    /* Dairy Appointment Module's Function's **/

    //New - Edit - Duplicate Appointment Dialog
    DiaryAppointment(actionType) {
       
        let DiaryPopupData = {}
        if (actionType == 'new') {
            DiaryPopupData = { action: actionType };
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            DiaryPopupData = { action: actionType };
        }
        const dialogRef = this.dialog.open(DairyDailogComponent, {
            disableClose: true,
            panelClass: 'Dairy-dialog',
            data: DiaryPopupData
        });
        dialogRef.afterClosed().subscribe(result => { });
    }

    //DeleteAppointment
    DeleteAppointment() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => { });
    }


    //_____________________________________________________________________________________________________
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    logOutUser() {
        this.authenticationService.logout();
    }

    navBarSetting(value: any) {

        let x = value.split("/");
        // console.log(x[1]);
        // console.log(x);
        this.activeSubMenu = x[2] ? x[2] : '';
        this.isInvoice = x[3] ? x[3] : '';
        if (x[1] == "matters" || x[1] == "") {
            this.isTabShow = 1;
        } else if (x[1] == "contact") {
            this.isTabShow = 2;
        } else if (x[1] == "time-billing") {
            this.isTabShow = 3;
        } else if (x[1] == "legal-details") {
            this.isTabShow = 4;
        } else if (x[1] == "diary" || x[1] == 'diary?calander=day' || x[1] == 'diary?calander=week' || x[1] == 'diary?calander=month') {
            this.isTabShow = 5;
        } else if (x[1] == "time-entries") {
            this.isTabShow = 6;
        } else if (x[1] == "invoice") {
            this.isTabShow = 7;
        } else if (x[1] == "spend-money") {
            this.isTabShow = 8;
        } else if (x[1] == "receive-money") {
            this.isTabShow = 9;
        } else if (x[1] == "create-document") {
            this.activedocument = x[1];
            this.isTabShow = 10;

            if (x[2] == "matter-template") {
                this.emailroutingtax = 'Matter';
                this.TemplateUrlHandel = '/create-document/matter-template'
                this.emailrouting = '/create-document/email-matter-template';

            }
            else if (x[2] == "invoice-template") {
                this.emailroutingtax = 'Invoice';
                this.TemplateUrlHandel = '/create-document/invoice-template'
                this.emailrouting = '/create-document/email-invoice-template';
            }
            else if (x[2] == "contact-template") {
                this.emailroutingtax = 'Contact';
                this.TemplateUrlHandel = '/create-document/contact-template'
                this.emailrouting = '/create-document/email-contact-template';
            }
            else if (x[2] == "receive-money-template") {
                this.emailroutingtax = 'Receipt';
                this.TemplateUrlHandel = '/create-document/receive-money-template'
                this.emailrouting = '/create-document/email-receive-money-template';
            }
        } else if (x[1] == "system-setting") {
            this.isTabShow = 11;
        } else if (x[1] == "users") {
            this.isTabShow = 12;
        } else if (x[1] == "activities") {
            this.isTabShow = 13;
        } else if (x[1] == "document-register") {
            this.isTabShow = 14;
        } else if (x[1] == "chart-account") {
            this.isTabShow = 15;
        } else if (x[1] == "genral-journal") {
            this.isTabShow = 16;
        }
        else if (x[1] == "conflict-check") {
            this.isTabShow = 17;
        } else if (x[1] == "authorities") {
            this.isTabShow = 18;
        } else if (x[1] == "searching") {
            this.isTabShow = 19;
        }

        else if (x[1] == "account-reconciliation") {
            this.isTabShow = 20;
        }
        else {
            this.isTabShow = 1;
        }
        this.activeSubMenu = x[2];
    }
    setTab(event: any) {
        this.selectedIndex = 0;
        setTimeout(() => {
            this.selectedIndex = undefined;
        }, 500);
    }

    // ****************************************** START Invoice related funtion like create update delete view*********************************************
    selectMatterInvoice() {
        const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                localStorage.setItem('set_active_matters', JSON.stringify(result));
                this.router.navigate(['time-billing/work-in-progress/invoice']);
            }
        });
    }
    //web19
    isInvoiceClick() {
        this.clickedBtn = 'invoiceDoc';
    }
    isMatterClick() {
        this.clickedBtn = 'matterDoc';
    }

    createInstantInvoice() {
        // return false;
        const dialogRef = this._matDialog.open(InstantInvoiceDailogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
            }
        });
    }

    createInvoice() {
        const dialogRef = this._matDialog.open(InvoiceAddDailogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
            }
        });
    }

    createReceiptForTimeBilling() {
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%', disableClose: true,
            data: { action: 'add' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshReceiceMoany').click();
            }
        });
    }

    ViewReceiptForTimeBilling() {
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%', disableClose: true,
            data: {
                action: 'editForTB'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }

    deleteReceiceMoanyForTimeBilling() {

    }

    createReceipt() {
        const dialogRef = this._matDialog.open(MatterReceiptDialogComponentForTemplate, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
                    width: '100%', disableClose: true,
                    data: { action: 'add', type: " ", matterData: result }
                });
                dialogRef.afterClosed().subscribe(result => { if (result) { } });
            }
        });
    }

    ViewReceipt() {
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%', disableClose: true,
            data: { action: 'edit' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                localStorage.removeItem('matterName');
            }
        });
    }
    //Invoice Detail for invoice
    InvoiceDetail() {
        const dialogRef = this._matDialog.open(InvoiceDetailComponent, { width: '100%', disableClose: true, data: { 'type': 'edit', INVOICEGUID: localStorage.getItem('edit_invoice_id') } });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
            }
        });
    }
    //delete invoice
    deleteInvoice(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let INVOICEGUID = localStorage.getItem('edit_invoice_id');
                let postData = { FormAction: "delete", DATA: { INVOICEGUID: INVOICEGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetInvoice').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshInvoiceTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    //delete receicept
    deleteReceiceMoany(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true, width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let receiptData = JSON.parse(localStorage.getItem('receiptData'));
                let postData = { FormAction: "delete", DATA: { INCOMEGUID: receiptData.INCOMEGUID } };
                this._mainAPiServiceService.getSetData(postData, 'SetIncome').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshReceiceMoany').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }

    NewGeneralReceipt(): void {
        const dialogRef = this._matDialog.open(GeneralReceiptDilogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshReceiceMoany').click();
            }
        });
    }

    // Searching start
    StartInfoDialog() {
        const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                localStorage.setItem('set_active_matters', JSON.stringify(result));
                // this.router.navigate(['time-billing/work-in-progress/invoice']);
            }
        });
    }

    // searching end


    //hidden button
    clickToolbarbtn() {
        this.isDocumentGenerateHide = "yes";
    }
    clickToolbarbtn2() {
        this.isDocumentGenerateHide = "no";
    }
    // spendmoneyMenubtn(){
    // this.spendMoneyMenu="disabled"; 
    // }
    // ******************************************END Invoice related funtion like create update delete view*********************************************
    //***********************************************************START Select Matter Contact*************************************************************************
    GenarateDocument() {
        let templateData = JSON.parse(localStorage.getItem('templateData'));
        if (this.router.url == "/create-document/invoice-template") {
            let invoiceGUid = localStorage.getItem('edit_invoice_id');
            let passdata = { 'Context': "Invoice", 'ContextGuid': invoiceGUid, "Type": "Template", "Folder": '', "Template": templateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/matter-template") {
            let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
            let passdata = { 'Context': "Matter", 'ContextGuid': matterData.MATTERGUID, "Type": "Template", "Folder": '', "Template": templateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/receive-money-template") {
            let ReceiptData = JSON.parse(localStorage.getItem('receiptData'));
            let passdata = { 'Context': "Income", 'ContextGuid': ReceiptData.INCOMEGUID, "Type": "Template", "Folder": '', "Template": templateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/contact-template") {
            let ContactGuID = localStorage.getItem('contactGuid');
            let passdata = { 'Context': "Contact", 'ContextGuid': ContactGuID, "Type": "Template", "Folder": '', "Template": templateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        }
    }
    //***********************************************************END Select Matter Contact*************************************************************************
    ForDocDialogOpen(passdata) {
        const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, { width: '100%', disableClose: true, data: passdata });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // localStorage.setItem('set_active_matters', JSON.stringify(result));
            }
        });
    }

}

//2 pair Data Convert
function chunks(arr, size = 3) {
    return arr.map((x, i) => i % size == 0 && arr.slice(i, i + size)).filter(x => x);
}



