import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MatDialog, MatDatepickerInputEvent, MAT_DIALOG_DATA } from '@angular/material';
import { MainAPiServiceService } from 'app/_services';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { BankingDialogComponent } from '../../banking/banking-dialog.component';
@Component({
  selector: 'app-general-receipt-dilog',
  templateUrl: './general-receipt-dilog.component.html',
  styleUrls: ['./general-receipt-dilog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class GeneralReceiptDilogComponent implements OnInit {
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  AMOUNT: any;
  errorWarningData: any = {};
  action: any;
  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GeneralReceiptDilogComponent>,
    public datepipe: DatePipe,
    public MatDialog: MatDialog,
    public _mainAPiServiceService: MainAPiServiceService,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ) { 
console.log(_data);
this.action=_data.type;
  }
  generalReceiptForm: FormGroup;
  isspiner: boolean;
  ReceiptData=JSON.parse(localStorage.getItem('receiptData'));
  isLoadingResults: boolean;
  getPayourarray: any;
  gsttypeData: any = [{ id: 1, text: "10% GST" }, { id: 2, text: "No GST" }, { id: 3, text: "< 10% GST" }];
  ngOnInit() {
    // this.isLoadingResults = true;
    this.generalReceiptForm = this._formBuilder.group({
      INCOMECLASS: [''],
      INCOMEDATETEXT: [new Date()],
      INCOMEDATE: [],
      INCOMETYPE: [''],
      PAYEE: [''],
      PAYEEGUID:[''],
      AMOUNT: [''],
      // gsttype: [''],
      // GST: [''],
      BANKACCOUNTGUID: [''],
      BANKACCOUNTGUIDTEXT: [''],
      INCOMEACCOUNTGUID: [''],
      INCOMEACCOUNTGUIDTEXT: [''],
      NOTE: [''],
    });
    if(this.action=="duplicate"){
      this.LoadData();
    }else{

      let INCOMEDATEVAL = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
      this.generalReceiptForm.controls['INCOMEDATE'].setValue(INCOMEDATEVAL);
    }

    this.getPayor({});
  }
  LoadData(){
     this.isLoadingResults = true;
    // console.log(this.ReceiptData);
    this._mainAPiServiceService.getSetData({INCOMEGUID:this.ReceiptData.INCOMEGUID}, 'GetIncome').subscribe(response => {
      console.log(response);
      if (response.CODE == 200 && response.STATUS == "success") {
        if (response.DATA.INCOMEITEMS[0]) {
          let DatePaid = response.DATA.INCOMEITEMS[0].INCOMEDATE.split("/");
          let DATE = new Date(DatePaid[1] + '/' + DatePaid[0] + '/' + DatePaid[2]);
          this.generalReceiptForm.controls['INCOMEDATE'].setValue(DATE);
          this.generalReceiptForm.controls['INCOMECLASS'].setValue(response.DATA.INCOMEITEMS[0].INCOMECLASS);
          this.generalReceiptForm.controls['INCOMETYPE'].setValue(response.DATA.INCOMEITEMS[0].INCOMETYPE);
          this.generalReceiptForm.controls['PAYEE'].setValue(response.DATA.INCOMEITEMS[0].PAYEE);
          this.generalReceiptForm.controls['AMOUNT'].setValue(response.DATA.INCOMEITEMS[0].AMOUNT);
          // this.generalReceiptForm.controls['BANKACCOUNTGUIDTEXT'].setValue(response.DATA.INCOMEITEMS[0].BANKACCOUNTGUIDTEXT);
          // this.generalReceiptForm.controls['INCOMEACCOUNTGUIDTEXT'].setValue(response.DATA.INCOMEITEMS[0].INCOMEACCOUNTGUIDTEXT);
          this.generalReceiptForm.controls['INCOMEACCOUNTGUID'].setValue(response.DATA.INCOMEITEMS[0].INCOMEACCOUNTGUID);
          this.generalReceiptForm.controls['BANKACCOUNTGUID'].setValue(response.DATA.INCOMEITEMS[0].BANKACCOUNTGUID);

          
          this.generalReceiptForm.controls['NOTE'].setValue(response.DATA.INCOMEITEMS[0].NOTE);
        }
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      }
      this.isLoadingResults = false;
    }, err => {
      this.isLoadingResults = false;
      this.toastr.error(err);
    });
  
  }
  PayeeTypeChange(value){
     this.generalReceiptForm.controls['PAYEE'].setValue(value);
;  }
  getPayor(postData) {
    this.isLoadingResults = true;
    this._mainAPiServiceService.getSetData(postData, 'GetContact').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        this.getPayourarray = response.DATA.CONTACTS;
       this.isLoadingResults = false;
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      } else {
        this.isLoadingResults = false;
      }


    }, err => {
      this.isLoadingResults = false;
      this.toastr.error(err);
    });
  }
  get f() {
    return this.generalReceiptForm.controls;
  }
  choosedDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.generalReceiptForm.controls['INCOMEDATE'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
  amountVal() {
    this.AMOUNT = parseFloat(this.f.AMOUNT.value).toFixed(2);
  }
  SaveGeneralReceipt() {
    this.isspiner = true;
    let data = {
      INCOMECLASS: this.f.INCOMECLASS.value,
      INCOMETYPE: this.f.INCOMETYPE.value,
      // FIRMGUID: this.f.FIRMGUID.value,
      INCOMEDATE: this.f.INCOMEDATE.value,
      PAYEE: this.f.PAYEE.value,
      AMOUNT: this.f.AMOUNT.value,
      // GST: this.f.GST.value,
      BANKACCOUNTGUID:this.f.BANKACCOUNTGUID.value,
      INCOMEACCOUNTGUID: this.f.INCOMEACCOUNTGUID.value,
      NOTE: this.f.NOTE.value,
    }
    let matterPostData: any = { FormAction: 'insert', VALIDATEONLY: true, Data: data };
    this._mainAPiServiceService.getSetData(matterPostData, 'SetIncome').subscribe(response => {
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.checkValidation(response.DATA.VALIDATIONS, matterPostData);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.checkValidation(response.DATA.VALIDATIONS, matterPostData);
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.checkValidation(response.DATA.VALIDATIONS, matterPostData);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      }
    }, error => {
      this.isspiner = false;
      this.toastr.error(error);
    });
  }
  checkValidation(bodyData: any, details: any) {
    let errorData: any = [];
    let warningData: any = [];
    let tempError: any = [];
    let tempWarning: any = [];
    bodyData.forEach(function (value) {
      if (value.VALUEVALID == 'No') {
        errorData.push(value.ERRORDESCRIPTION);
        tempError[value.FIELDNAME] = value;
      } else if (value.VALUEVALID == 'Warning') {
        if (value.FIELDNAME != "INCOMECODE")
          warningData.push(value.ERRORDESCRIPTION);
        tempWarning[value.FIELDNAME] = value;
      }
    });
    this.errorWarningData = { "Error": tempError, 'warning': tempWarning };
    if (Object.keys(errorData).length != 0)
      this.toastr.error(errorData);
    if (Object.keys(warningData).length != 0) {
      this.confirmDialogRef = this.MatDialog.open(FuseConfirmDialogComponent, {
        disableClose: true,
        width: '100%',
        data: warningData
      });
      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to Save?';
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isspiner = true;
        }
        this.confirmDialogRef = null;
      });
    }
    if (Object.keys(warningData).length == 0 && Object.keys(errorData).length == 0)
      this.SaveReceiptAfterVAlidation(details);
    this.isspiner = false;
  }
  SaveReceiptAfterVAlidation(data: any) {
    data.VALIDATEONLY = false;
    this._mainAPiServiceService.getSetData(data, 'SetIncome').subscribe(response => {

      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.toastr.success('Receipt save successfully');
        this.isspiner = false;
        this.dialogRef.close(true);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.toastr.error(response.MESSAGE);
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.toastr.warning(response.MESSAGE);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      }
      this.isspiner = false;
    }, error => {
      this.toastr.error(error);
    });
  }
  BankingDialogOpen(type: any) {
    const dialogRef = this.MatDialog.open(BankingDialogComponent, {
      disableClose: true, width: '100%', data: { AccountType: type ,FromWhere:'generalReceiptIncome' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.AccountType == "INCOME") {
        this.generalReceiptForm.controls['INCOMEACCOUNTGUIDTEXT'].setValue(result.MainList.ACCOUNTCLASS + ' - ' + result.MainList.ACCOUNTNUMBER);
        this.generalReceiptForm.controls['INCOMEACCOUNTGUID'].setValue(result.ACCOUNTGUID);
      } else {
        this.generalReceiptForm.controls['BANKACCOUNTGUIDTEXT'].setValue(result.MainList.ACCOUNTCLASS + ' - ' + result.MainList.ACCOUNTNUMBER);
        this.generalReceiptForm.controls['BANKACCOUNTGUID'].setValue(result.ACCOUNTGUID);
      }
    });
  }


}
