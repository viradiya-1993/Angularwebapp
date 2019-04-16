import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TimersService, MattersService } from '../../../../_services';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-time-entry-dialog',
  templateUrl: './time-entry-dialog.component.html',
  styleUrls: ['./time-entry-dialog.component.scss']
})
export class TimeEntryDialogComponent implements OnInit, AfterViewInit {

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  LookupsList: any;
  userList: any;
  matterList: any;
  isspiner: boolean = false;
  isLoadingResults: boolean = false;
  ActivityList: any = [];
  optionList: any = [
    { 'ACTIVITYID': 'hh:mm', 'DESCRIPTION': 'hh:mm' },
    { 'ACTIVITYID': 'Hours', 'DESCRIPTION': 'Hours' },
    { 'ACTIVITYID': 'Minutes', 'DESCRIPTION': 'Minutes' },
    { 'ACTIVITYID': 'Days', 'DESCRIPTION': 'Days' },
    { 'ACTIVITYID': 'Units', 'DESCRIPTION': 'Units' },
    { 'ACTIVITYID': 'Fixed', 'DESCRIPTION': 'Fixed' }
  ];
  ITEMDATEVLAUE: any;

  QuantityTypeLabel: any = 'Quantity Type';

  constructor(
    public dialogRef: MatDialogRef<TimeEntryDialogComponent>,
    private Timersservice: TimersService,
    private MattersService: MattersService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private toasterService: ToastrService,
    public datepipe: DatePipe
  ) { }
  timeEntryForm: FormGroup;
  ngOnInit() {
    this.ActivityList = this.optionList;
    this.timeEntryForm = this._formBuilder.group({
      MATTERGUID: ['', Validators.required],
      ITEMTYPE: ['', Validators.required],
      QUANTITYTYPE: ['', Validators.required],
      ITEMDATE: ['', Validators.required],
      FEEEARNER: ['', Validators.required],
      QUANTITY: ['', Validators.required],
      PRICE: ['', Validators.required],
      PRICEINCGST: ['', Validators.required],
      ADDITIONALTEXT: ['', Validators.required],
      COMMENT: ['', Validators.required],
    });
    this.isLoadingResults = true;
    this.Timersservice.GetLookupsData({}).subscribe(res => {
      if (res.CODE == 200 && res.STATUS == "success") {
        this.LookupsList = res.DATA.LOOKUPS;
      } else {
        this.LookupsList = [];
      }
      this.isLoadingResults = false;
    }, err => {
      this.toastr.error(err);
    });
    this.isLoadingResults = true;
    this.Timersservice.GetUsers({}).subscribe(res => {
      if (res.CODE == 200 && res.STATUS == "success") {
        this.userList = res.DATA.USERS;
      } else {
        this.userList = [];
      }
      this.isLoadingResults = false;
    }, err => {
      this.toastr.error(err);
    });
    this.isLoadingResults = true;
    this.MattersService.getMatters({ "Active": "active" }).subscribe(res => {
      if (res.CODE == 200 && res.STATUS == "success") {
        this.matterList = res.DATA.MATTERS;
      } else {
        this.matterList = [];
      }
      this.isLoadingResults = false;
    }, err => {
      this.toastr.error(err);
    });
  }
  choosedDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.ITEMDATEVLAUE = this.datepipe.transform(event.value, 'dd/MM/yyyy');
  }
  ngAfterViewInit(): void {
    $('#time_Control').attr('placeholder', 'Select time');
  }
  onChangeHour(event) {
    console.log('event', event);
  }
  ondialogcloseClick(): void {
    this.dialogRef.close(false);
  }
  get f() {
    return this.timeEntryForm.controls;
  }
  itemTypeChange(value: any) {
    if (value == 'Activity' || value == 'Sundry') {
      this.QuantityTypeLabel = value == 'Activity' ? 'Activity' : 'Sundry';
      let callType = value == 'Activity' ? 'Activity' : 'Sundries';
      this.Timersservice.GetActivity({ "ActivityType": callType }).subscribe(res => {
        if (res.CODE == 200 && res.STATUS == "success") {
          this.ActivityList = res.DATA.ACTIVITIES;
          console.log(this.ActivityList);
        }
      }, err => {
        this.toastr.error(err);
      });
    } else {
      this.QuantityTypeLabel = 'Quantity Type';
      this.ActivityList = this.optionList;
    }
  }
  LookupsChange(value: any) {
    this.timeEntryForm.controls['ADDITIONALTEXT'].setValue(value);
  }
  SaveClickTimeEntry() {
    this.isspiner = true;
    let PostTimeEntryData = {
      "FormAction": "insert",
      "ADDITIONALTEXT": this.f.ADDITIONALTEXT.value,
      "COMMENT": this.f.COMMENT.value,
      "FEEEARNER": this.f.FEEEARNER.value,
      "FEETYPE": this.f.ITEMTYPE.value,
      // "INVOICEGUID": "value",
      // "INVOICEORDER": "value",
      "ITEMDATE": this.ITEMDATEVLAUE,
      "ITEMTIME": "value",
      "MATTERGUID": this.f.MATTERGUID.value,
      "PRICE": this.f.PRICE.value,
      // "PRICECHARGED": "value",
      // "PRICEINCGST": "value",
      // "PRICEINCGSTCHARGED": "value",
      // "GST": "value",
      // "GSTCHARGED": "value",
      // "GSTTYPE": "value",
      "QUANTITYTYPE": this.f.QUANTITYTYPE.value,
      "QUANTITY": this.f.QUANTITY.value,
    }
    this.Timersservice.SetWorkItems(PostTimeEntryData).subscribe(res => {
      if (res.CODE == 200 && res.STATUS == "success") {
        this.toasterService.success('Time entry added successfully');
        this.dialogRef.close(false);
      } else {
        if (res.CODE == 402 && res.STATUS == "error" && res.MESSAGE == "Not logged in")
          this.dialogRef.close(false);
      }
      this.isspiner = false;
    }, err => {
      this.isspiner = false;
      this.toastr.error(err);
    });
    console.log(PostTimeEntryData);
  }

}
