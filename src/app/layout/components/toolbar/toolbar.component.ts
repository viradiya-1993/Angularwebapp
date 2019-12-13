import { Component, OnDestroy, OnInit, ViewEncapsulation, Injectable, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Location } from '@angular/common';
import { navigation } from 'app/navigation/navigation';
import { AuthenticationService, MainAPiServiceService, TimersService, BehaviorService } from '../../../_services';
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

import { UserDialogComponent } from './../../../main/pages/users/user-dialog/user-dialog.component';
import { ActivityDialogComponent } from './../../../main/pages/activities/activity-dialog/activity-dialog.component';
import { ChangePasswordComponent } from 'app/main/change-password/change-password.component';

import { DocumentDailogComponent } from './../../../main/pages/document-register/document-dailog/document-dailog.component';
import { EmailDailogComponent } from './../../../main/pages/template/email-templete/email-dailog/email-dailog.component';
import { PacksDailogComponent } from './../../../main/pages/template/packs/packs-dailog/packs-dailog.component';
import { ChartAcDailogComponent } from './../../../main/pages/chart-account/chart-ac-dailog/chart-ac-dailog.component';
import { FileNoteDialogComponent } from 'app/main/pages/matters/file-note-dialog/file-note-dialog.component';
import { BankingDialogComponent } from 'app/main/pages/banking/banking-dialog.component';
import { GeneralDailogComponent } from './../../../main/pages/general-journal/general-dailog/general-dailog.component';
// import { AuthorityDialogComponent } from 'app/main/pages/main-authorities/authority-dialog/authority-dialog.component';
import { ReportFilterComponent } from './../../../main/pages/general-journal/report-filter/report-filter.component';
import { ChronItemDailogComponent } from './../../../main/pages/legal-details/chronology/chron-item-dailog/chron-item-dailog.component';
import { DairyDailogComponent } from './../../../main/pages/diary/dairy-dailog/dairy-dailog.component';
import { ResumeTimerComponent } from 'app/main/pages/time-entries/resume-timer/resume-timer.component';
import { CopyTemplateComponent } from 'app/main/pages/template/template-list/copy-template/copy-template.component';
import { SetLetterHeadComponent } from 'app/main/pages/template/template-list/set-letterhead/set-letterhead.component';
import { EditTemplateComponent } from 'app/main/pages/template/template-list/edit-template/edit-template.component';
import { WriteOffTimeEntryComponent } from 'app/main/pages/time-entries/write-off-time-entry/write-off-time-entry.component';
import { SafeCustodyDialogeComponent } from 'app/main/pages/legal-details/safecustody/safe-custody-dialog/safe-custody-dialog.component';
import { TrustMoneyDialogeComponent } from 'app/main/pages/Trust Accounts/trust-money/trust-money-dialoge/trust-money-dialoge.component';
import { ContactSelectDialogComponent } from 'app/main/pages/contact/contact-select-dialog/contact-select-dialog.component';
import { TaskDialogeComponent } from 'app/main/pages/Task/task-dialoge/task-dialoge.component';
import { WriteOffInvoiceComponent } from 'app/main/pages/invoice/newWriteOffInvoice/newWriteOffInvoice.component';
// import { TopicDialogComponent } from 'app/main/pages/main-authorities/topic/topic-dialog/topic-dialog.component';
import { AuthorityDialogComponent } from 'app/main/pages/globally-Authority/main-authorities/authority-dialog/authority-dialog.component';
import { TopicDialogComponent } from 'app/main/pages/globally-Authority/main-authorities/topic/topic-dialog/topic-dialog.component';
import { EstimateDilogComponent } from 'app/main/pages/time-billing/estimate/estimate-dilog/estimate-dilog.component';
import { GenerateInvoiceComponent } from 'app/main/pages/invoice/generate-invoice/generate-invoice.component';
import { PacketsDialogComponent } from 'app/main/pages/globally-safecustody/packets/packets-dialog/packets-dialog.component';
import { TrustChartOfAccountDailogComponent } from 'app/main/pages/trust-chart-of-account/trust-chart-of-account-dailog/trust-chart-of-account-dailog.component'
import { round } from 'lodash';
import { ReCalcTimeEntriesDialogeComponent } from 'app/main/pages/time-billing/re-calc-timeEntrie-dialoge/re-calc-timeEntrie-dialoge.component';
import { SpendMoneyComponent } from 'app/main/pages/spend-money/spend-money.component';
@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
@Injectable()
export class ToolbarComponent implements OnInit, OnDestroy {
    MainAuthorityData: any;
    activeMenu: any;
    TopicMaindata: any;
    LegalAuthorityData: any;
    LegalAuthotool: string;
    LegalAuthoritySubAuthata: any;
    LegalSubAuthotool: any;
    mainlegalAuthWebUrl: any;
    recouncileItemdata: any;
    ShowGenerateInvoice: string;
    DairyData: any;
    JournalData: any;
    receiptData: any;
    DisabledReceiptTool: string;
    safecustodydata: any;
    PacketsData: any;
    CurrentDate: any;
    PathOfRouter: any;
    SafeCustodyData: any;
    ShowMatLable: any;
    ChartHandlingData: any = [];
    TotalUnbilledWIP: any;
    TotalOutstanding: any;
    WorkInProgressData: any;
    CommonToolbarHSData: any;
    ClickTypeForTrustChartHD: any;
    AccountClassForTrustChartHD: any;
    [x: string]: any;
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
    TemplateGenerateData: any = [];
    // Private
    private _unsubscribeAll: Subject<any>;
    activedocument: any;
    clickedBtn: string;
    hideShowDoc: string;
    isDocumentGenerateHide: string;
    templateRoter: string;
    spendMoneyMenu: string;
    emailrouting: string;
    TemplateUrlHandel: string;
    packrouting: string;
    KitName: any;
    KitGUid: any;
    packsToobar: string;
    EmailtemplateData: any = [];
    SendMoney_dataGUID: any;
    DocRegData: any = [];
    AccountGUID: any;
    chartAccountDetail: any;
    isMainAccount: boolean = false;
    TaskData: any;
    FileNotesData: any;
    conflictData: any;
    ChronologyLegalData: any;
    disconflictToolbar: string;
    DisEnTimeEntryToolbar: string;
    timeEntryData: any;
    DisMainAuthorityToolbar: string;
    estimateData: any;
    journalText: any = 'View';
    journalLinktype: any;
    @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
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
        public MatDialog: MatDialog,
        public behaviorService: BehaviorService,
    ) {
        // call dashboard showing api
        this.DashboardAPI();
        //For receipt 
        this.behaviorService.ReceiptData$.subscribe(result => {
            this.DisabledReceiptTool = "disabled";
            if (result) {
                this.receiptData = result;
                this.DisabledReceiptTool = "enabled";
            }
        });
        this.behaviorService.workInProgress$.subscribe(result => {
            if (result) {
                this.WorkInProgressData = result
            }
        });
        //for Disabled enabled
        this.behaviorService.ConflictDataList$.subscribe(result => {
            if (result == null) { this.disconflictToolbar = 'yes'; } else { this.disconflictToolbar = 'no'; }
        });
        this.behaviorService.GeneralData$.subscribe(result => {
            if (result) {
                this.JournalData = result;
                this.journalLinktype = result.LINKTYPE;
                if (this.journalLinktype == "Receipt" || this.journalLinktype == "Invoice") {
                    this.journalText = 'View';
                } else if (this.journalLinktype == "Income" || this.journalLinktype == "General Journal" || this.journalLinktype == "Expenditure" || this.journalLinktype == "Payable" || this.journalLinktype == "Disbursement") {
                    this.journalText = 'Edit';
                }
            }
        });

        this.behaviorService.MainTimeEntryData$.subscribe(result => {
            this.timeEntryData = result; if (result != null) {
                if (result.INVOICEGUID == "-1" || result.INVOICEGUID == -1) {
                    this.DisEnTimeEntryToolbar = 'undo';
                } else { this.DisEnTimeEntryToolbar = 'write_off'; }
            }
        });

        this.behaviorService.MainAuthorityData$.subscribe(result => {
            this.MainAuthorityData = result;
            if (result != null) {
                if (result.AUTHORITY != undefined) {
                    if (result.AUTHORITY.WEBADDRESS != '') {
                        this.mainlegalAuthWebUrl = result.Main.WEBADDRESS;
                    } else { this.mainlegalAuthWebUrl = '' }
                    this.DisMainAuthorityToolbar = 'Autho_yes';
                }
                else { this.DisMainAuthorityToolbar = 'Autho_no'; this.mainlegalAuthWebUrl = '' }
            }
        });

        this.behaviorService.LegalAuthorityData$.subscribe(result => {
            if (result != null) {
                this.LegalAuthorityData = result;
                if (result.AUTHORITY != undefined) {
                    this.mainlegalAuthWebUrl = result.Main.WEBADDRESS;
                    this.LegalAuthotool = 'addMatterHide';
                } else {
                    this.mainlegalAuthWebUrl = "";
                    this.LegalAuthotool = '';
                }
            }
        });
        this.behaviorService.LegalAuthorityForSubAuthToolbar$.subscribe(result => {
            if (result != null) {
                this.LegalAuthoritySubAuthata = result;
                if (result.WEBADDRESS != '') {
                    this.LegalSubAuthotool = result.WEBADDRESS;
                } else {
                    this.LegalSubAuthotool = '';
                }
            }
        });

        //Trust Chart Account Behaviour 
        this.behaviorService.TrustDuplicateModuleHandling$.subscribe(result => {
            if (result != null) {
                this.ShowMatLable = result.Lable;
            }
        });
        //common MainBar hideShow 
        this.behaviorService.CommonToolbarHS$.subscribe(result => {
            if (result) {
                this.CommonToolbarHSData = result;
                this.ClickTypeForTrustChartHD = result.ClickType;
                this.AccountClassForTrustChartHD = result.AccountClass;
            }
        });
        //for navigation bar 
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
        this.behaviorService.ChartAccountData$.subscribe(result => {
            if (result) {
                this.chartAccountDetail = result;
                this.AccountGUID = result.ACCOUNTGUID;
            }
        });
        this.behaviorService.ChartAccountDataEdit$.subscribe(result => {
            if (result) {
                this.isMainAccount = result.MainList.ACCOUNTTYPENAME == "Header"
            }
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
        this.updateTimerCounter();
        this.displayMattterList();
        // Subscribe to the config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((settings) => {
            this.horizontalNavbar = settings.layout.navbar.position === 'top';
            this.rightNavbar = settings.layout.navbar.position === 'right';
            this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });

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
                $('.mat-tab-header').css({ 'width': wph - nvh - 226 + 'px' });
            }
        });
    }
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
            $('.mat-tab-header').css({ 'width': wph - nvh - 226 + 'px' });
        }
    }
    // DashboardAPI start //

    DashboardAPI() {
        this._mainAPiServiceService.getSetData({ Dashboard: 'total unbilled wip' }, 'GetDashboard').subscribe(res => {
            if (res.CODE == 200 && res.STATUS == "success") {
                this.TotalUnbilledWIP = round(res.DATA.DASHBOARDDATA[0].INCGST);
            }
        });
        this._mainAPiServiceService.getSetData({ Dashboard: 'total outstanding' }, 'GetDashboard').subscribe(res => {
            if (res.CODE == 200 && res.STATUS == "success") {
                this.TotalOutstanding = round(res.DATA.DASHBOARDDATA[0].INCGST);
            }
        });
    }
    // DashboardAPI end  //
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
                localStorage.setItem('contactGuid', getMatterContactGuId.CONTACTGUID);
                actionType = "edit";
                if (getMatterContactGuId.CONTACTGUID == "") {
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
    AddAuthorityFromLegal(val) {
        this.behaviorService.LegalAuthorityToolbar(val);
        $('#refreshLegalAuthorityADD').click();
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

    /* ---------------------------------------------------------------------Matter End--------------------------------------------------------------------------  */
    /* ---------------------------------------------------------------------Activity Start--------------------------------------------------------------------------  */
    //add edit and duplicat ActivityDialog
    ActivityDialog(actionType, name) {
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
            disableClose: true, panelClass: 'Activity-dialog',
            data: {
                popupData,
                popupname: name
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshActivities').click();
                $('#refreshWorkInprogress').click();
            }
        });
    }
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
        } else if (actionType == "edit" || actionType == "duplicate") {
            let ActiveUserData = JSON.parse(localStorage.getItem('current_user_Data'));
            if (!ActiveUserData) {
                this.toastr.error("Please Select User");
                return false;
            }
            popupData = {action: actionType, USERGUID: ActiveUserData.USERGUID};
        }
        const dialogRef = this.dialog.open(UserDialogComponent, { disableClose: true, panelClass: 'User-dialog', data: popupData });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshUser').click();
            }
        });
    }
    //DeleteUser
    DeleteUser(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let ActiveUserData = JSON.parse(localStorage.getItem('current_user_Data'));
                let postData = { FormAction: "delete", data: { USERGUID: ActiveUserData.USERGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetUser').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshUser').click();
                        this.toastr.success('Delete successfully');
                    }
                });

            }
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
        this.TimersServiceI.addTimeEnrtS('');
    }
    displayMattterList() {
        this.prevMatterArray = [];
        if (localStorage.getItem(this.timerId)) {
            let timerObj = JSON.parse(localStorage.getItem(this.timerId));
            clearTimeout(this.timerInterval);
            timerObj.forEach(items => {
                this.prevMatterArray.push({ 'WORKITEMGUID': items.WORKITEMGUID, 'matter_id': items.matter_id, 'matterguid': items.matterguid, 'time': this.secondsToHms(items.time), 'isStart': items.isStart });
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
        let WORKITEMGUID;
        for (var i = AllTimer.length - 1; i >= 0; --i) {
            if (AllTimer[i].matterguid == matterId) {
                if (localStorage.getItem('start_' + AllTimer[i].matter_id)) {
                    clearTimeout(this.timerInterval);
                    matterDataTime = this.secondsToHms(localStorage.getItem('start_' + AllTimer[i].matter_id));
                    WORKITEMGUID = AllTimer[i].WORKITEMGUID;
                    localStorage.removeItem('start_' + AllTimer[i].matter_id);
                    this.currentTimer = 0;
                } else {
                    matterDataTime = this.secondsToHms(AllTimer[i].time);
                    WORKITEMGUID = AllTimer[i].WORKITEMGUID;
                }
                AllTimer.splice(i, 1);
            }
        }
        localStorage.setItem(this.timerId, JSON.stringify(AllTimer));
        $('#sidebar_open_button').click();
        if (WORKITEMGUID && WORKITEMGUID != '') {
            this.ResumeTimePopup('resume', { time: matterDataTime, WORKITEMGUID: WORKITEMGUID });
        } else {
            this.addNewTimeEntry(matterId, matterDataTime, '');
        }
    }
    addNewTimeEntryNew(isReadOnly) {
        let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
        if (matterData.ACTIVE) {
            this.addNewTimeEntry(matterData.MATTERGUID, '', isReadOnly);
        } else {
            this.toastr.error("You cannot time entry for Inactive matter. Please select active matter and try again.");
            return false;
        }
    }
    ResumeTimePopup(type: any, timerData: any) {
        const dialogRef = this.dialog.open(ResumeTimerComponent, { width: '100%', disableClose: true, data: { 'type': type, 'matterData': timerData } });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshTimeEntryTab').click();
                $('#refreshWorkInprogress').click();
            }
        });
    }
    addNewTimeEntry(Data: any, matterData: any, isReadOnly: any) {
        if (Data == 'Add-New') {
            const dialogRef = this.MatDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    localStorage.setItem('set_active_matters', JSON.stringify(result));
                    const dialogRef = this.dialog.open(TimeEntryDialogComponent, { width: '100%', disableClose: true, data: { 'edit': 'Add', 'matterData': matterData, isReadOnly: isReadOnly } });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            $('#refreshTimeEntryTab').click();
                            $('#refreshWorkInprogress').click();
                        }
                    });
                }
            });
        } else {
            const dialogRef = this.dialog.open(TimeEntryDialogComponent, { width: '100%', disableClose: true, data: { 'edit': Data, 'matterData': matterData, isReadOnly: isReadOnly } });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    $('#refreshTimeEntryTab').click();
                    $('#refreshWorkInprogress').click();
                }
            });
        }
    }
    EditTimeEntryFromWIP() {
        if (this.WorkInProgressData.ITEMTYPEDESC == 'Disbursement') {
            this.spendmoneypopup('edit');
        } else {
            this.addNewTimeEntry('Edit', '', '')
        }


    }
    WriteOffTimeEntry() {
        const dialogRef = this._matDialog.open(WriteOffTimeEntryComponent, {
            width: '100%', disableClose: true, data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshTimeEntryTab').click();
            }
        });
    }

    CreateDiary() {
        $('#saveCreateDiary').click();
    }

    GenerateInvoice() {
        this.behaviorService.matterInvoice$.subscribe(result => {
            if (result != null) {
                this.ShowGenerateInvoice = "yes";
            } else {
                this.ShowGenerateInvoice = "no";
            }
        });
        const dialogRef = this._matDialog.open(GenerateInvoiceComponent, {
            width: '100%', disableClose: true, data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // $('#refreshTimeEntryTab').click();
            }
        });
    }
    GenerateReceipt() {
        let receiData = JSON.parse(localStorage.getItem('receiptData'));
        let passdata = {
            Context: 'Receipt',
            ContextGuid: receiData.INCOMEGUID,
            knownby: 'Template',
            Type: 'Template',
            Template: "<DEFRECTEMP>"
        }
        const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, {
            width: '100%',
            disableClose: true,
            data: passdata
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    UndoWriteOffTimeEntry() {
        let postData = { FormAction: "undo write off", DATA: { WORKITEMGUID: this.timeEntryData.WORKITEMGUID } }
        this.TimersServiceI.SetWorkItems(postData).subscribe(res => {
            if (res.STATUS == "success" && res.CODE == 200) {
                $('#refreshTimeEntryTab').click();
                this.toastr.success('Undo successfully');
            }
        });
    }
    RecouncileAccount() {
        $("#SetRecouncilItem").click();

    }
    undoRecouncilebtn() {

        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to undo the last recouncilitaion? This will reverse the last recuncilition!';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", DATA: { AccountGuid: this.AccountGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetReconciliation').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    /* ---------------------------------------------------------------------end of timer add--------------------------------------------------------------------------  */
    //Reportpopup open
    Reportpopup(ReportData) {
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
    //// File PopUp 
    FileNotePopup(actionType) {
        let FileNotePopdata = {}
        if (actionType == 'new') {
            FileNotePopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            FileNotePopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(FileNoteDialogComponent, {
            disableClose: true,
            panelClass: 'Document-dialog',
            data: FileNotePopdata
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshFileNote').click();
            }

        });
    }

    DeleteFileNotes() {
        this.behaviorService.FileNotesData$.subscribe(result => {
            if (result) {
                this.FileNotesData = result;
            }
        });
        if (this.FileNotesData == null) {
            this.toastr.error("No Data Selected");
        } else {
            this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                disableClose: true,
                width: '100%',
            });
            this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
            this.confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {
                    let postData = { FormAction: "delete", DATA: { FILENOTEGUID: this.FileNotesData.FILENOTEGUID } }
                    this._mainAPiServiceService.getSetData(postData, 'SetFileNote').subscribe(res => {
                        if (res.STATUS == "success" && res.CODE == 200) {
                            $('#refreshFileNote').click();
                            this.toastr.success('Delete successfully');
                        }
                    });
                }
                this.confirmDialogRef = null;
            });
        }
    }

    Deletespendmoneypopup(): void {
        this.behaviorService.SpendMoneyData$.subscribe(result => {
            if (result) {
                this.SendMoney_dataGUID = result;
            }
        });
        if (this.SendMoney_dataGUID == null) {
            this.toastr.error("No Data Selected");
        } else {
            this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                disableClose: true,
                width: '100%',
            });
            this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
            this.confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {
                    let postData = { FormAction: "delete", DATA: { EXPENDITUREGUID: this.SendMoney_dataGUID.EXPENDITUREGUID } }
                    this._mainAPiServiceService.getSetData(postData, 'SetExpenditure').subscribe(res => {
                        if (res.STATUS == "success" && res.CODE == 200) {
                            $('#refreshSpendMoneyTab').click();
                            // this.spendmoney.refreshSpendMoneyTab();
                            this.toastr.success('Delete successfully');
                        }
                    });
                }
                this.confirmDialogRef = null;
            });
        }
    }
    // 
    addNewEstimate(actionType) {
        let EstimatePopdata = {}
        if (actionType == 'new') {
            EstimatePopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            EstimatePopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(EstimateDilogComponent, { disableClose: true, panelClass: 'Document-dialog', data: EstimatePopdata });
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                $('#refresheEtimateTab').click();
        });
    }
    //delete Estimate  item
    deleteEstimate() {
        this.behaviorService.estimatelegalData$.subscribe(result => {
            if (result) {
                this.estimateData = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true, width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", DATA: { ESTIMATEITEMGUID: this.estimateData.ESTIMATEITEMGUID } };
                this._mainAPiServiceService.getSetData(postData, 'SetMatterEstimateItem').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $("#refresheEtimateTab").click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    //// Duplicate Spend Money
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
                let WORKITEMGUID;
                this.behaviorService.workInProgress$.subscribe(workInProgressData => {
                    if (workInProgressData) {
                        this.WorkInProgressData = workInProgressData;
                        WORKITEMGUID = workInProgressData.WORKITEMGUID;
                    } else {
                        WORKITEMGUID = localStorage.getItem('edit_WORKITEMGUID');
                    }
                });
                let postData = { FormAction: "delete", data: { WORKITEMGUID: WORKITEMGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetWorkItems').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshTimeEntryTab').click();
                        $('#refreshWorkInprogress').click();
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
    ChangePass() {
        const dialogRef = this.dialog.open(ChangePasswordComponent, { disableClose: true, panelClass: 'change-password' });
        dialogRef.afterClosed().subscribe(result => {

        });
    }
    /* Document Register Module */
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
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                $("#refreshDOCREGTab").click();
        });
    }
    ///Spend Money 

    spendmoneypopup(actionType: any, val: any = '') {
        let SpendMoneyPopdata = {}
        if (actionType == 'new') {
            SpendMoneyPopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            SpendMoneyPopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(SpendMoneyAddComponent, {
            disableClose: true,
            panelClass: 'SpendMoney-dialog',
            data: { action: actionType, FromWhere: val }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $("#refreshSpendMoneyTab").click();
                $('#refreshRecouncilItem').click();
                $('#refreshWorkInprogress').click();
                $('#refreshGeneral').click();
            }
        });
    }

    DeleteDocument(): void {
        this.behaviorService.DocumentRegisterData$.subscribe(result => {
            if (result) {
                this.DocRegData = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { DOCUMENTGUID: this.DocRegData.DOCUMENTGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetDocument').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshDOCREGTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });;
            }

        });
    }
    OpenMatter() {
        console.log('Matter Folder Work!!!');
    }
    OpenDocument() {
        console.log('Document  Work!!!');
    }
    LoadDocument() {
        console.log('Load Document Work!!!');
    }
    PdfDocument() {
        console.log('Pdf Document work!!!')
    }
    PdfEmailDocument() {
        console.log('Pdf Email Document Work!!!');
    }
    GenarateEmail() {
        this.behaviorService.EmailGenerateData$.subscribe(result => {
            if (result) {
                this.EmailtemplateData = result;
            }
        });
        if (this.router.url == "/create-document/email-invoice-template" || this.router.url == "/create-document/packs-invoice-template") {
            let invoiceGUid = localStorage.getItem('edit_invoice_id');
            let passdata = { 'Context': "Invoice", 'ContextGuid': invoiceGUid, "knownby": "Template", "Type": "Email", "Folder": '', "Template": this.EmailtemplateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-matter-template" || this.router.url == "/create-document/packs-matter-template") {
            let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
            let passdata = { 'Context': "Matter", 'ContextGuid': matterData.MATTERGUID, "knownby": "Email", "Type": "Email", "Folder": '', "Template": this.EmailtemplateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-receive-money-template" || this.router.url == "/create-document/packs-receive-money-template") {
            let ReceiptData = JSON.parse(localStorage.getItem('receiptData'));
            let passdata = { 'Context': "Income", 'ContextGuid': ReceiptData.INCOMEGUID, "knownby": "Email", "Type": "Email", "Folder": '', "Template": this.EmailtemplateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-contact-template" || this.router.url == "/create-document/packs-contact-template") {
            let ContactGuID = localStorage.getItem('contactGuid');
            let passdata = { 'Context': "Contact", 'ContextGuid': ContactGuID, "knownby": "Email", "Type": "Email", "Folder": '', "Template": this.EmailtemplateData.NAME }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/email-safe-custody-template" || this.router.url == "/create-document/packs-safe-custody-template") {
            let passdata = { 'Context': "Safe Custody", 'ContextGuid': this.SafeCustodyData.SAFECUSTODYGUID, "knownby": "Email", "Type": "Email", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
            this.ForEmailDialogOpen(passdata);
        }
    }
    GenaratePacks() {
        this.behaviorService.packs$.subscribe(result => {
            if (result) {
                this.KitName = result.KITNAME;
            }
        });
        if (this.router.url == "/create-document/packs-invoice-template") {
            let invoiceGUid = localStorage.getItem('edit_invoice_id');
            let passdata = { 'Context': "Invoice", 'ContextGuid': invoiceGUid, "knownby": "Pack", "Type": "Pack", "Folder": '', "Template": this.KitName }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/packs-matter-template") {
            let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
            let passdata = { 'Context': "Matter", 'ContextGuid': matterData.MATTERGUID, "knownby": "Pack", "Type": "Pack", "Folder": '', "Template": this.KitName }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/packs-receive-money-template") {
            let ReceiptData = JSON.parse(localStorage.getItem('receiptData'));
            let passdata = { 'Context': "Income", 'ContextGuid': ReceiptData.INCOMEGUID, "knownby": "Pack", "Type": "Pack", "Folder": '', "Template": this.KitName }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/packs-contact-template") {
            let ContactGuID = localStorage.getItem('contactGuid');
            let passdata = { 'Context': "Contact", 'ContextGuid': ContactGuID, "knownby": "Pack", "Type": "Pack", "Folder": '', "Template": this.KitName }
            this.ForEmailDialogOpen(passdata);
        } else if (this.router.url == "/create-document/packs-safe-custody-template") {
            let passdata = { 'Context': "Safe Custody", 'ContextGuid': this.SafeCustodyData.SAFECUSTODYGUID, "knownby": "Pack", "Type": "Pack", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
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
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshEmailTab').click();
            }

        });
    }
    DeleteEmailTemplete() {
        this.behaviorService.EmailGenerateData$.subscribe(result => {
            if (result) {
                this.EmailtemplateData = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { EMAILGUID: this.EmailtemplateData.EMAILGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetEmail').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshEmailTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
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
            if (result) {
                $('#refreshKitTab').click();
            }
        });
    }
    DeletePack(): void {
        this.behaviorService.packs$.subscribe(result => {
            if (result) {
                this.KitGUid = result.KITGUID;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { KITGUID: this.KitGUid } }
                this._mainAPiServiceService.getSetData(postData, 'SetKit').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshKitTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
        });
    }
    ConflictStart() {
        // this.behaviorService.ConflictMainData$.subscribe(result => {
        //     if (result) {
        //         console.log(result);
        //         this.conflictData = result;
        //     }
        // });

        $('#refreshConflict').click();
        // this._mainAPiServiceService.getSetData(this.conflictData, 'GetConflictCheck').subscribe(res => {
        //     console.log(res);
        //     if (res.STATUS == "success" && res.CODE == 200) {

        //         // this.toastr.success('Delete successfully');
        //     }
        // });
    }
    /////// Trust Chart Account 
    ChartAccount(val) {
        if (val == 'WithoutTrust') {
            this.ChartHandlingData = {
                ClickType: val,
                UseTrust: 'No',
                PopUp: '',
                Lable: "CHART ACCOUNT",
            }
            localStorage.setItem('ChartURL', JSON.stringify(this.ChartHandlingData));
        } else if (val == 'WithTrust') {

            this.ChartHandlingData = {
                ClickType: val,
                UseTrust: 'Yes',
                PopUp: '',
                Lable: "TRUST CHART ACCOUNT",
            }
            localStorage.setItem('ChartURL', JSON.stringify(this.ChartHandlingData));
        }

        this.behaviorService.TrustDuplicateModuleHandling(this.ChartHandlingData);
    }

    //// GeneralJournal handling 
    GeneralJournal(val){
        if (val == 'WithoutTrust') {
            this.ChartHandlingData = {
                ClickType: val,
                UseTrust: 'No',
                PopUp: '',
                Lable: "GENERAL JOURNAL",
            }
            localStorage.setItem('ChartURL', JSON.stringify(this.ChartHandlingData));
            
        } else if (val == 'WithTrust') {
            this.ChartHandlingData = {
                ClickType: val,
                UseTrust: 'Yes',
                PopUp: '',
                Lable: "TRUST GENERAL JOURNAL",
            }
            localStorage.setItem('ChartURL', JSON.stringify(this.ChartHandlingData));
        }
        this.behaviorService.TrustDuplicateModuleHandling(this.ChartHandlingData);
    }



    SelectMatter() {
        const dialogRef = this.MatDialog.open(MatterDialogComponent, {
            width: '100%',
            disableClose: true,
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
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
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", DATA: { ACCOUNTGUID: this.AccountGUID } };
                this._mainAPiServiceService.getSetData(postData, 'SetAccount').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshChartACCTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
        });
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
            if (result) {
                $("#refresMainAuthority").click();
            }
        });
    }

    TopicDialog(val) {
        const dialogRef = this.dialog.open(TopicDialogComponent, {
            disableClose: true,
            panelClass: 'ChartAc-dialog',
            data: {
                action: val,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $("#refresMainTopic").click();
            }
        });
    }
    SafeCustodyPopup(val) {
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
                let postData = { FormAction: "delete", data: { AUTHORITYGUID: this.MainAuthorityData.Main.AUTHORITYGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetAuthority').subscribe(res => {
                    if (res.STATUS == "success") {
                        $('#refresMainAuthority').click();
                        this.toastr.success(res.STATUS);
                    } else {
                        this.toastr.error("You Can't Delete Contact Which One Is To Related to Matters");
                    }
                });;
            }
            this.confirmDialogRef = null;
        });
    }
    DeleteTopicData(): void {
        this.behaviorService.MainTopicData$.subscribe(result => {
            if (result) {
                this.TopicMaindata = result
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { TOPICGUID: this.TopicMaindata.Main.TOPICGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetTopic').subscribe(res => {
                    if (res.STATUS == "success") {
                        $('#refresMainTopic').click();
                        this.toastr.success(res.STATUS);
                    } else {
                        this.toastr.error("You Can't Delete Contact Which One Is To Related to Matters");
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }

    /* General Journal Module Function's */
    //NewGeneral
    NewGeneral(actionType) {
        const dialogRef = this.dialog.open(GeneralDailogComponent, {
            disableClose: true, panelClass: 'Chrone-dialog', data: { action: actionType }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshGeneral').click();
            }
        });
    }
    //ViewDetails
    ViewDetails() {
        if (this.journalLinktype == "Expenditure" || this.journalLinktype == "Payable" || this.journalLinktype == "Disbursement") {
            this.behaviorService.SpendMoneyData({ EXPENDITUREGUID: this.JournalData.LINKGUID });
            this.spendmoneypopup('edit');
        } else if (this.journalLinktype == "Receipt") {
            localStorage.setItem('receiptData', JSON.stringify({ INCOMEGUID: this.JournalData.LINKGUID }));
            this.ViewReceipt('view');
        } else if (this.journalLinktype == "Invoice") {
            localStorage.setItem('edit_invoice_id', this.JournalData.LINKGUID);
            this.InvoiceDetail('view');
        } else if (this.journalLinktype == "Income") {
            localStorage.setItem('receiptData', JSON.stringify({ INCOMEGUID: this.JournalData.LINKGUID }));
            this.NewGeneralReceipt('edit');
        } else if (this.journalLinktype == "General Journal") {
            this.NewGeneral('edit');
        }
    }
    //DeleteGeneral
    DeleteGeneral() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { JOURNALGUID: this.JournalData.JOURNALGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetJournal').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $('#refreshGeneral').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
        });
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
    // PrepareReceipt() {
    //     const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
    //         width: '100%',
    //         disableClose: true,
    //         data: {}
    //     });
    //     dialogRef.afterClosed().subscribe(result => {

    //     });
    // }
    //_____________________________________________________________________________________________________
    BankingDialogOpen(type: any, forPoPUpHandel: any,ForTrust:any) {

        // for trust handling starting 
        if (ForTrust == 'WithoutTrust') {
            this.ChartHandlingData = {
                ClickType: ForTrust,
                UseTrust: 'No',
                PopUp: '',
                Lable: "Select Account",
            }
            localStorage.setItem('ChartURL', JSON.stringify(this.ChartHandlingData));
            
        } else if (ForTrust == 'WithTrust') {
            this.ChartHandlingData = {
                ClickType: ForTrust,
                UseTrust: 'Yes',
                PopUp: '',
                Lable: "Select Trust Account",
            }
            localStorage.setItem('ChartURL', JSON.stringify(this.ChartHandlingData));
        }
        this.behaviorService.TrustDuplicateModuleHandling(this.ChartHandlingData);
        // for trust handling Ending 
        if (forPoPUpHandel) {
            this.PathOfRouter = forPoPUpHandel
        } else {
            this.PathOfRouter = '';
        }
        const dialogRef = this.dialog.open(BankingDialogComponent, {
            disableClose: true, width: '100%', data: { AccountType: type, RoterPath: this.PathOfRouter }
        });
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
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshLegalChronology').click();
            }
        });
    }
    //DeleteChron
    DeleteChron() {
        this.behaviorService.LegalChronologyData$.subscribe(result => {
            if (result) {
                this.ChronologyLegalData = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { CHRONOLOGYGUID: this.ChronologyLegalData.CHRONOLOGYGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetChronology').subscribe(res => {
                    if (res.STATUS == "success") {
                        $('#refreshLegalChronology').click();
                        this.toastr.success(res.STATUS);
                    } else {
                        this.toastr.error("You Can't Delete Contact Which One Is To Related to Matters");
                    }
                });
            }
            this.confirmDialogRef = null;
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
        this.behaviorService.forDiaryRefersh$.subscribe(result => {
            this.DairyData = result;
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.DairyData.DairyRowClickData 
                let postData = { FormAction: "delete", data: { APPOINTMENTGUID: this.DairyData.DairyRowClickData } }
                this._mainAPiServiceService.getSetData(postData, 'SetAppointment').subscribe(res => {
                    if (res.STATUS == "success") {
                        this.behaviorService.forDiaryRefersh2("call");
                        // $('#refreshLegalChronology').click();
                        this.toastr.success(res.STATUS);
                    } else {
                        this.toastr.error("You Can't Delete Contact Which One Is To Related to Matters");
                    }
                });;
            }
            this.confirmDialogRef = null;
        });
    }
    setViewType(params: any) {
        this.behaviorService.UseCalanderViewType$.subscribe(result => {
            if (result != null) {
                this.CurrentDate = result
            } else {
                this.CurrentDate = new Date();
            }
            // this.getEvents();
        });
        this.behaviorService.setCalanderViewType(params);
        this.behaviorService.UseCalanderViewType(this.CurrentDate);
    }
    setTimeScale(params: any) {
        this.behaviorService.setTimeScale(params);
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
        this.activeMenu = x[1]
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
            if (x[2] == "create-diary") {
                this.isTabShow = 26;
            }
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
            if (x[2] == "matter-template" || x[2] == "email-matter-template" || x[2] == "packs-matter-template") {
                this.TemplateUrlHandel = '/create-document/matter-template'
                this.emailrouting = '/create-document/email-matter-template';
                this.packrouting = '/create-document/packs-matter-template';
                this.packsToobar = 'Packs';
            }
            else if (x[2] == "invoice-template" || x[2] == "email-invoice-template" || x[2] == "packs-invoice-template") {
                this.TemplateUrlHandel = '/create-document/invoice-template'
                this.emailrouting = '/create-document/email-invoice-template';
                this.packrouting = '/create-document/packs-invoice-template';
                this.packsToobar = 'Packs';
            }
            else if (x[2] == "contact-template" || x[2] == "email-contact-template" || x[2] == "packs-contact-template") {
                this.TemplateUrlHandel = '/create-document/contact-template'
                this.emailrouting = '/create-document/email-contact-template';
                this.packrouting = '/create-document/packs-contact-template';
                this.packsToobar = 'Packs';
            }
            else if (x[2] == "receive-money-template" || x[2] == "email-receive-money-template" || x[2] == "packs-receive-money-template") {
                this.TemplateUrlHandel = '/create-document/receive-money-template'
                this.emailrouting = '/create-document/email-receive-money-template';
                this.packrouting = '/create-document/packs-receive-money-template';
                this.packsToobar = 'Packs';
            }
            else if (x[2] == "safe-custody-template" || x[2] == "email-safe-custody-template" || x[2] == "packs-safe-custody-template") {
                this.TemplateUrlHandel = '/create-document/safe-custody-template'
                this.emailrouting = '/create-document/email-safe-custody-template';
                this.packrouting = '/create-document/packs-safe-custody-template';
                this.packsToobar = 'Packs';
            }
        } else if (x[1] == "system-setting") {
            this.isTabShow = 11;
        } else if (x[1] == "users") {
            this.isTabShow = 12;
        } else if (x[1] == "activities") {
            this.isTabShow = 13;
        } else if (x[1] == "document-register") {
            this.isTabShow = 14;
        } else if (x[1] == "chart-account" || x[1] == 'trust-chart-account') {
            this.isTabShow = 15;
        } else if (x[1] == "general-journal" || x[1] == "trust-general-journal") {
            this.isTabShow = 16;
        } else if (x[1] == "conflict-check") {
            this.isTabShow = 17;
        } else if (x[1] == "authorities") {
            this.isTabShow = 18;
        } else if (x[1] == "searching") {
            this.isTabShow = 19;
        } else if (x[1] == "account-reconciliation") {
            this.isTabShow = 20;
        } else if (x[1] == "account-management") {
            this.isTabShow = 21;
        } else if (x[1] == "Safe-Custody") {
            this.isTabShow = 22;
        } else if (x[1] == "trust-money") {
            this.isTabShow = 23;
        } else if (x[1] == "trust-end-month") {
            this.isTabShow = 24;
        } else if (x[1] == "task") {
            this.isTabShow = 25;
        } else if (x[1] == "trust-chart-of-account") {
            this.isTabShow = 27;
        } else if (x[1] == "trust-general-journal") {
            this.isTabShow = 28;
        } else if (x[1] == "dashboard") {
            this.isTabShow = 29;
        }
        else {
            this.isTabShow = 1;
        }
        this.activeSubMenu = x[2];
        this.behaviorService.SetActiveSubMenu(this.activeSubMenu);
        // this.behaviorService.navigation(this.router.url);
        // this.selectedIndex=0;
            this.setTab('');
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
    NewTimeEntry(type: any) {
        if (type == 'timeBill') {
            let temMatterData = JSON.parse(localStorage.getItem('set_active_matters'));
            const dialogRef = this.dialog.open(ResumeTimerComponent, { width: '100%', disableClose: true, data: { 'type': 'new', 'matterData': temMatterData } });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    $('#refreshTimeEntryTab').click();
                    $('#refreshWorkInprogress').click();
                }
            });
        } else {
            const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    const dialogRef = this.dialog.open(ResumeTimerComponent, { width: '100%', disableClose: true, data: { 'type': 'new', 'matterData': result } });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            $('#refreshTimeEntryTab').click();
                            $('#refreshWorkInprogress').click();
                        }
                    });
                }
            });
        }
    }
    //web19
    isInvoiceClick() {
        this.clickedBtn = 'invoiceDoc';
    }
    isMatterClick() {
        this.clickedBtn = 'matterDoc';
    }
    createInstantInvoice() {
        if (this.router.url != '/time-billing/matter-invoices' && this.router.url != 'time-billing/work-in-progress/invoice' && this.router.url != '/matters') {
            const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    localStorage.setItem('set_active_matters', JSON.stringify(result));
                    // this.router.navigate(['time-billing/work-in-progress/invoice']);
                    const dialogRef = this._matDialog.open(InstantInvoiceDailogComponent, { width: '100%', disableClose: true, data: null });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            $('#refreshWorkInprogress').click();
                        }
                    });
                }
            });
        } else {
            const dialogRef = this._matDialog.open(InstantInvoiceDailogComponent, { width: '100%', disableClose: true, data: null });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {

                }
            });
        }
    }
    createInvoice() {
        const dialogRef = this._matDialog.open(InvoiceAddDailogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshWorkInprogress').click();
                $('#refreshTimeEntryTab').click();
            }
        });
    }
    createReceiptForTimeBilling() {
        let result = JSON.parse(localStorage.getItem('set_active_matters'));
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%', disableClose: true,
            data: { action: 'add', type: " ", matterData: result }

            // data: { action: 'add' }
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
    createReceipt() {
        const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
                    width: '100%', disableClose: true,
                    data: { action: 'add', type: " ", matterData: result }
                });
                dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        $('#refreshReceiceMoany').click();
                    }
                });
            }
        });
    }
    ViewReceipt(type: any) {
        const dialogRef = this._matDialog.open(ReceiptDilogComponent, {
            width: '100%', disableClose: true,
            data: { action: type }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                localStorage.removeItem('matterName');
                $('#refreshGeneral').click();
            }
        });
    }
    InvoiceWriteoff() {
        let INVOICEGUID = '';
        this.behaviorService.matterInvoice$.subscribe(matterInvoiceData => {
            if (matterInvoiceData)
                INVOICEGUID = matterInvoiceData.INVOICEGUID;
        });
        const dialogRef = this._matDialog.open(WriteOffInvoiceComponent, { width: '100%', disableClose: true, data: { 'type': 'edit', INVOICEGUID: INVOICEGUID } });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshMatterInvoice').click();
            }
        });
    }
    //Invoice Detail for invoice
    InvoiceDetail(isType) {
        let INVOICEGUID = '';
        let editType = 'edit';
        if (isType == 'isTime') {
            this.behaviorService.matterInvoice$.subscribe(matterInvoiceData => {
                if (matterInvoiceData)
                    INVOICEGUID = matterInvoiceData.INVOICEGUID;
            });
        } else if (isType == 'view') {
            editType = 'view';
            INVOICEGUID = localStorage.getItem('edit_invoice_id');
        } else {
            INVOICEGUID = localStorage.getItem('edit_invoice_id');
        }
        const dialogRef = this._matDialog.open(InvoiceDetailComponent, { width: '100%', disableClose: true, data: { 'type': editType, INVOICEGUID: INVOICEGUID } });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {

            }
        });
    }
    //delete invoice
    deleteInvoice(isType): void {
        // let INVOICEGUID = '';
        // if (isType == 'isTime') {
        //     this.behaviorService.matterInvoice$.subscribe(matterInvoiceData => {
        //         if (matterInvoiceData)
        //             INVOICEGUID = matterInvoiceData.INVOICEGUID;
        //     });
        // } else {
        //     INVOICEGUID = localStorage.getItem('edit_invoice_id');
        // }
        // this.GloballyDelete({API:'SetInvoice', DATA: { INVOICEGUID: INVOICEGUID }});


        // this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        //     disableClose: true,
        //     width: '100%',
        // });
        // let INVOICEGUID = '';
        // if (isType == 'isTime') {
        //     this.behaviorService.matterInvoice$.subscribe(matterInvoiceData => {
        //         if (matterInvoiceData)
        //             INVOICEGUID = matterInvoiceData.INVOICEGUID;
        //     });
        // } else {
        //     INVOICEGUID = localStorage.getItem('edit_invoice_id');
        // }
       
        // let postData = { FormAction: "delete", DATA: { INVOICEGUID: INVOICEGUID } }
        // this._mainAPiServiceService.getSetData(postData, 'SetInvoice').subscribe(res => {
        //     console.log(res)

        //     if(res.STATUS == "error"){
        //         this.confirmDialogRef.componentInstance.confirmMessage = res.MESSAGE;
        //         this.confirmDialogRef.afterClosed().subscribe(result => {
        //             if (result) {
                    
        //             }
        //             this.confirmDialogRef = null;
        //         });
        
        //     }
        //     if (res.STATUS == "success" && res.CODE == 200) {
              
        //         // $('#refreshInvoiceTab').click();
        //         // this.toastr.success('Delete successfully');
        //     }
        // });
        
      


        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to Save?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let INVOICEGUID = '';
                if (isType == 'isTime') {
                    this.behaviorService.matterInvoice$.subscribe(matterInvoiceData => {
                        if (matterInvoiceData)
                            INVOICEGUID = matterInvoiceData.INVOICEGUID;
                    });
                } else {
                    INVOICEGUID = localStorage.getItem('edit_invoice_id');
                }
                this.GloballyDelete({API:'SetInvoice', DATA: { INVOICEGUID: INVOICEGUID }});
                // let postData = { FormAction: "delete", DATA: { INVOICEGUID: INVOICEGUID } }
                // this._mainAPiServiceService.getSetData(postData, 'SetInvoice').subscribe(res => {
                //     if (res.STATUS == "success" && res.CODE == 200) {
                //         $('#refreshInvoiceTab').click();
                //         this.toastr.success('Delete successfully');
                //     }
                // });
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
                        $('#refresheReceiptsTab').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    NewGeneralReceipt(type: any): void {
        const dialogRef = this._matDialog.open(GeneralReceiptDilogComponent, { width: '100%', disableClose: true, data: { 'type': type, 'Id': '' } });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refreshReceiceMoany').click();
                $('#refreshRecouncilItem').click();
                $('#refreshGeneral').click();
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
    //////// Start  Task///////////////////
    TaskDialoge(val) {
        if (val == 'new matter') {
            const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.OpenTaskPopUp(val);
                }
            });
        } else {
            this.OpenTaskPopUp(val);
        }
    }
    OpenTaskPopUp(actionType) {
        let TaskPopdata = {}
        if (actionType == 'new matter' || 'new general') {
            TaskPopdata = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'copy' || actionType == 'copy legal' || actionType == 'edit legal') {
            TaskPopdata = { action: actionType }
        }
        const dialogRef = this.dialog.open(TaskDialogeComponent, {
            disableClose: true,
            panelClass: 'Task-dialog',
            data: TaskPopdata
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $("#refreshTask").click();
                $("#refreshLegalTask").click();
            }
        });
    }
    deleteTask() {
        this.behaviorService.TaskData$.subscribe(result => {
            if (result) {
                this.TaskData = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true, width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", DATA: { TASKGUID: this.TaskData.TASKGUID } };
                this._mainAPiServiceService.getSetData(postData, 'SetTask').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $("#refreshTask").click();
                        $("#refreshLegalTask").click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });

    }
    //////// End  Task///////////////////
    clickToolbarbtn() {
        this.isDocumentGenerateHide = "yes";
    }
    clickToolbarbtn2() {
        this.isDocumentGenerateHide = "no";
    }
    /** PACKETS MODULE FUNCTION'S */
    OpenPacket(actionType) {
        let PacketPopData = {}
        if (actionType == 'new') {
            PacketPopData = { action: actionType }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            PacketPopData = { action: actionType }
        }
        const dialogRef = this.dialog.open(PacketsDialogComponent, {
            disableClose: true,
            panelClass: 'Packets-dialog',
            data: PacketPopData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $('#refereshpacketsdata').click();
            }
        });
    }
    DeletePacket(): void {
        this.behaviorService.Packets$.subscribe(result => {
            if (result) {
                this.PacketsData = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", data: { SAFECUSTODYPACKETGUID: this.PacketsData.SAFECUSTODYPACKETGUID } }
                this._mainAPiServiceService.getSetData(postData, 'SetSafeCustodyPacket').subscribe(res => {
                    if (res.STATUS == "success") {
                        $('#refereshpacketsdata').click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }
    /* Safe Custody Module's*/
    OpenNewSafeCustody(actionType) {
        if (actionType === 'new client' || actionType == 'copy') {
            const dialogRef = this._matDialog.open(ContactSelectDialogComponent, { width: '100%', disableClose: true, data: { type: null } });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.SafeCustodyPoup({ action: actionType, result: result });
                }
            });
        } else if (actionType === 'new matter') {
            const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.SafeCustodyPoup({ action: actionType, result: result });
                }
            });
        } else if (actionType === 'newlegal') {
            this.SafeCustodyPoup({ action: actionType, result: '' });
        } else {
            this.SafeCustodyPoup({ action: actionType, result: '' });
        }
    }
    SafeCustodyPoup(safeCustodyData: any) {
        const dialogRef = this.dialog.open(SafeCustodyDialogeComponent, {
            disableClose: true,
            panelClass: 'Safe-Custody-dialog',
            data: { safeCustodyData }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                $("#mainsafecusday").click();
                $("#Legalsafecusday").click();
            }
        });
    }
    DeleteSafeCustody(): void {
        this.behaviorService.SafeCustody$.subscribe(result => {
            if (result) {
                this.safecustodydata = result;
            }
        });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true, width: '100%',
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                let postData = { FormAction: "delete", DATA: { SAFECUSTODYGUID: this.safecustodydata.SAFECUSTODYGUID } };
                this._mainAPiServiceService.getSetData(postData, 'SetSafeCustody').subscribe(res => {
                    if (res.STATUS == "success" && res.CODE == 200) {
                        $("#mainsafecusday").click();
                        $("#Legalsafecusday").click();
                        this.toastr.success('Delete successfully');
                    }
                });
            }
            this.confirmDialogRef = null;
        });

    }
    /** Trust Chart Of Account's */
    TrustNewAccount(actionType) {
        if (actionType === 'new') {
            const dialogRef = this._matDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.TrustNewChartAccount(actionType, result);
                    // $("#mainsafecusday").click();
                }
            });
        } else {
            this.TrustNewChartAccount(actionType, '');
        }
    }
    TrustNewChartAccount(actionType, result) {
        let TrustNewChartAccountData = {}
        if (actionType == 'new') {
            TrustNewChartAccountData = { action: actionType, result }
        } else if (actionType == 'edit' || actionType == 'duplicate') {
            TrustNewChartAccountData = { action: actionType, result }
        }
        const dialogRef = this.dialog.open(TrustChartOfAccountDailogComponent, {
            disableClose: true,
            panelClass: 'Trust-Chart-Account-Dailog',
            data: TrustNewChartAccountData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // $("#mainsafecusday").click();
            }
        });
    }
    TrustDeleteAccount(): void {
        // this.behaviorService.SafeCustody$.subscribe(result => {
        //     if (result) {
        //         this.safecustodydata = result;
        //     }
        // });
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true, width: '100%',
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        // this.confirmDialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         let postData = { FormAction: "delete", DATA: { SAFECUSTODYGUID: this.safecustodydata.SAFECUSTODYGUID } };
        //         this._mainAPiServiceService.getSetData(postData, 'SetSafeCustody').subscribe(res => {
        //             if (res.STATUS == "success" && res.CODE == 200) {
        //                 $("#mainsafecusday").click();
        //                 $("#Legalsafecusday").click();
        //                 this.toastr.success('Delete successfully');
        //             }
        //         });
        //     }
        //     this.confirmDialogRef = null;
        // });
    }
    // spendmoneyMenubtn(){
    // this.spendMoneyMenu="disabled"; 
    // }
    // ******************************************END Invoice related funtion like create update delete view*********************************************
    //***********************************************************START Select Matter Contact*************************************************************************
    GenarateDocument() {
        this.behaviorService.TemplateGenerateData$.subscribe(result => {
            if (result) {
                this.TemplateGenerateData = result;
            }
        });
        this.behaviorService.SafeCustody$.subscribe(result => {
            if (result) {
                this.SafeCustodyData = result;
            }
        });
        if (this.router.url == "/create-document/invoice-template" || this.router.url == "/create-document/packs-invoice-template") {
            let invoiceGUid = localStorage.getItem('edit_invoice_id');
            let passdata = { 'Context': "Invoice", 'ContextGuid': invoiceGUid, "knownby": "Template", "Type": "Template", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/matter-template" || this.router.url == "/create-document/packs-matter-template") {
            let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
            let passdata = { 'Context': "Matter", 'ContextGuid': matterData.MATTERGUID, "knownby": "Template", "Type": "Template", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/receive-money-template" || this.router.url == "/create-document/packs-receive-money-template") {
            let ReceiptData = JSON.parse(localStorage.getItem('receiptData'));
            let passdata = { 'Context': "Income", 'ContextGuid': ReceiptData.INCOMEGUID, "knownby": "Template", "Type": "Template", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/contact-template" || this.router.url == "/create-document/packs-contact-template") {
            let ContactGuID = localStorage.getItem('contactGuid');
            let passdata = { 'Context': "Contact", 'ContextGuid': ContactGuID, "knownby": "Template", "Type": "Template", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        } else if (this.router.url == "/create-document/safe-custody-template" || this.router.url == "/create-document/packs-safe-custody-template") {
            let passdata = { 'Context': "Safe Custody", 'ContextGuid': this.SafeCustodyData.SAFECUSTODYGUID, "knownby": "Template", "Type": "Template", "Folder": '', "Template": this.TemplateGenerateData.TEMPLATENAME }
            this.ForDocDialogOpen(passdata);
        }
    }
    CopyTemplatePopup() {
        const dialogRef = this._matDialog.open(CopyTemplateComponent, { width: '100%', disableClose: true, });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // localStorage.setItem('set_active_matters', JSON.stringify(result));
            }
        });
    }
    SetLetterHeadPopup() {
        const dialogRef = this._matDialog.open(SetLetterHeadComponent, { width: '100%', disableClose: true, });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // localStorage.setItem('set_active_matters', JSON.stringify(result));
            }
        });
    }
    EditTemplatePopup() {
        const dialogRef = this._matDialog.open(EditTemplateComponent, { width: '100%', disableClose: true, });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // localStorage.setItem('set_active_matters', JSON.stringify(result));
            }
        });
    }
    TrustMoneyPopup(val) {
        const dialogRef = this._matDialog.open(TrustMoneyDialogeComponent, {
            width: '100%', disableClose: true,
            data: {
                action: val,
                forPDF:"No",
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            $("#trustMoneyRefersh").click();
                //localStorage.setItem('set_active_matters', JSON.stringify(result));   
            }
        });
    }
    ReCalcTimeEntriClick(){
        const dialogRef = this._matDialog.open(ReCalcTimeEntriesDialogeComponent, {
            width: '100%', disableClose: true,
            data: {
                action: ''
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }
    //***********************************************************END Select Matter Contact*************************************************************************
    ForDocDialogOpen(passdata) {
        const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, { width: '100%', disableClose: true, data: passdata });
        dialogRef.afterClosed().subscribe(result => {
            if (result) { }
        });
    }
    packsToolbarHide() {
        this.behaviorService.packs$.subscribe(result => {
            if (result != null) {
                if (result.TEMPLATETYPEDESC == 'Email') {
                    this.packsToobar = 'Email';
                } else if (result.TEMPLATETYPEDESC == 'Template') {
                    this.packsToobar = 'Template';
                } else {
                    this.packsToobar = 'Packs';
                }
            }
        });
    }

// globally delete 
GloballyDelete(getData) {
    let details = { FormAction: 'delete', VALIDATEONLY: true, Data: getData.DATA };
    this._mainAPiServiceService.getSetData(details, getData.API).subscribe(response => {
      //array empty of save item
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.checkValidation(response.DATA.VALIDATIONS, details,getData.API);
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.checkValidation(response.DATA.VALIDATIONS, details,getData.API);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.checkValidation(response.DATA.VALIDATIONS, details,getData.API);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      } else {
      }

    }, error => {
      this.toastr.error(error);
    });
  }
  checkValidation(bodyData: any, details: any,ApiName:any) {
    let errorData: any = [];
    let warningData: any = [];
    let tempError: any = [];
    let tempWarning: any = [];
    bodyData.forEach(function (value) {
      if (value.VALUEVALID == 'No' || value.VALUEVALID == 'Error') {
        errorData.push(value.ERRORDESCRIPTION);
        tempError[value.FIELDNAME] = value;
      }
      else if (value.VALUEVALID == 'Warning') {
        tempWarning[value.FIELDNAME] = value;
        warningData.push(value.ERRORDESCRIPTION);
      }else{
        
      }
    });
 
    if (Object.keys(errorData).length != 0) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: true,
            width: '100%',
            data: errorData
          });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
          this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.confirmDialogRef = null;
          });

    } else if (Object.keys(warningData).length != 0) {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        disableClose: true,
        width: '100%',
        data: warningData
      });
      this.confirmDialogRef.componentInstance.confirmMessage = warningData;
      this.confirmDialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result) {
            console.log(result)
          this.DeleteGData(details,ApiName);
        }
        this.confirmDialogRef = null;
      });
    } else if (Object.keys(warningData).length == 0 && Object.keys(errorData).length == 0) {
        this.DeleteGData(details,ApiName);
    }
  }
  DeleteGData(data: any,ApiName) {
    data.VALIDATEONLY = false;
    this._mainAPiServiceService.getSetData(data, ApiName).subscribe(response => {
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
         this.toastr.success(' Delete successfully');
         $('#refreshInvoiceTab').click();
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.toastr.warning(response.MESSAGE);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.toastr.error(response.MESSAGE);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      }
    }, error => {
      this.toastr.error(error);
    });
  }
}
//2 pair Data Convert
function chunks(arr, size = 3) {
    return arr.map((x, i) => i % size == 0 && arr.slice(i, i + size)).filter(x => x);
}



