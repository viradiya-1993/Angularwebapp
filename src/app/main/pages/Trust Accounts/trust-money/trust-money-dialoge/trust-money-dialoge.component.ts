import { Component, OnInit, Input, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainAPiServiceService } from 'app/_services';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatterDialogComponent } from 'app/main/pages/time-entries/matter-dialog/matter-dialog.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-trust-money.dialoge',
  templateUrl: './trust-money-dialoge.component.html',
  styleUrls: ['./trust-money-dialoge.component.scss'],
  animations: fuseAnimations
})
export class TrustMoneyDialogeComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  errorWarningData: any = { "Error": [], 'Warning': [] };
  isLoadingResults: boolean = false;
  TrustMoneyData = {
    "PaymentType": "Cheque", "CheckBox": false
  }
  addData: any = [];
  isspiner: boolean = false;
  PymentType: string = "Cheque";
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  matterType: boolean = false;
  action: any;
  title: string;
  ForDetailTab: string;
  TrustMoneyForm: FormGroup;
  constructor(private _mainAPiServiceService: MainAPiServiceService,
    private _formBuilder: FormBuilder, private toastr: ToastrService,
    public dialogRef: MatDialogRef<TrustMoneyDialogeComponent>,
    private dialog: MatDialog,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public _data: any, ) {
    this.TrustMoneyForm = this._formBuilder.group({
      TRANSACTIONDATE: [''],
      AMOUNT: [''],
      PAYMENTTYPE: [''],
      PaymentType: [''],
      //item 
      SHORTNAME: [''],
      MATTERGUID: [''],
      PURPOSE: [''],
      //cheque details 
      CHEQUENO: [''],
      ACCOUNTNAME: [''],
      ACCOUNTNUMBER: [''],
      BSB: [''],
      EFTREFERENCE: [''],
      // cash 
      COINS: [''],
      FIFTYDOLLARS: [''],
      HUNDREDDOLLARS: [''],
      FIVEDOLLARS: [''],
      TENDOLLARS: [''],
      TWENTYDOLLARS: [''],
      // address
      ADDRESS1: [''],
      POSTCODE: [''],
      STATE_: [''],
      SUBURB: [''],
      // extra
      BankChequeChkBox: [''],
      CheckBox: [''],
      INVOICEDVALUEEXGST:['']
    });
    this.TrustMoneyForm.controls['PAYMENTTYPE'].setValue('Cheque');
    this.TrustMoneyForm.controls['CheckBox'].setValue(false);
    this.action = _data.action;
    if (this.action == "receipt") {
      this.title = "Add Trust Receipt"
    } else if (this.action == "withdrawal") {
      this.title = "Add Trust withdrawal";
    } else if (this.action == "Transfer") {
      this.title = "Add Trust Transfer";
      this.TrustMoneyForm.controls['PAYMENTTYPE'].setValue('Transfer');
      this.TrustMoneyData.PaymentType = "Transfer";
      this.PymentType = "Transfer";
    } else if (this.action == "office") {
      this.title = "Add Trust Office";
      this.matterType = true;
      this.TrustMoneyForm.controls['CheckBox'].setValue(true);
      this.TrustMoneyData.CheckBox = true;
      // this.PymentType="Office";
    } else if (this.action == "money receipt") {
      this.title = "Add Controlled Money Receipt";
    } else if (this.action == "money withdrawal") {
      this.title = "Add Controlled Money withdrawal";
    } else if (this.action == "Cancelled Cheque") {
      this.title = "Add Cancelled Cheque";
    } else if (this.action == "Unknown Deposit") {
      this.title = "Add Unknown Deposit Receipt";
    } else if (this.action == "Transfer Unknow Deposit") {
      this.title = "Add Unknown Deposit Transfer";
      this.action = "Transfer";
      this.TrustMoneyForm.controls['PAYMENTTYPE'].setValue('Transfer');
      this.TrustMoneyData.PaymentType = "Transfer";
      this.PymentType = "Transfer";
    } else if (this.action == "Statutory Deposit") {
      this.title = "Add Statutory Depositl";
      this.ForDetailTab = 'Statutory Deposit';
      this.action = "withdrawal";
    } else if (this.action == "Statutory Receipt") {
      this.title = "Add Statutory Receipt";
      this.ForDetailTab = 'Statutory Receipt';
      this.action = "receipt";
    } else if (this.action == "Release Trust") {
      this.title = "Add Release Trust";
    }
  }
  ngOnInit() {
    // this._mainAPiServiceService.getSetData({}, 'GetSystem').subscribe(response=>{
    // this.addData=response.DATA.SYSTEM.ADDRESSGROUP.POSTALADDRESSGROUP
    // });
  }
  get f() {
    return this.TrustMoneyForm.controls;
  }
  PaymentTypeChange(val) {
    if (val == "Cheque") {
      this.PymentType = "Cheque";
    } else if (val == "EFT") {
      this.PymentType = "EFT";
    } else if (val == "Cash") {
      this.PymentType = "Cash";
    }
  }
  ChkDeltabx(val) {
  }
  CheckBoxClick(val) {
    this.matterType = val
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  SelectMatter() {
    const dialogRef = this.dialog.open(MatterDialogComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.TrustMoneyForm.controls['SHORTNAME'].setValue(result.MATTER);
        this.TrustMoneyForm.controls['MATTERGUID'].setValue(result.MATTERGUID);

        this.TrustMoneyForm.controls['INVOICEDVALUEEXGST'].setValue(result.MATTERGUID);
      }
    });
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  SaveTrustMoney() {
    let data = {
      TRANSACTIONDATE: this.f.TRANSACTIONDATE.value,
      AMOUNT: this.f.AMOUNT.value,
      PAYMENTTYPE: this.f.PAYMENTTYPE.value,
      PaymentType: this.f.PaymentType.value,
      //item 
      SHORTNAME: this.f.SHORTNAME.value,
      MATTERGUID: this.f.MATTERGUID.value,
      PURPOSE: this.f.PURPOSE.value,
      //cheque details 
      CHEQUENO: this.f.CHEQUENO.value,
      ACCOUNTNAME: this.f.ACCOUNTNAME.value,
      ACCOUNTNUMBER: this.f.ACCOUNTNUMBER.value,
      BSB: this.f.BSB.value,
      EFTREFERENCE: this.f.EFTREFERENCE.value,
      // cash 
      COINS: this.f.COINS.value,
      FIFTYDOLLARS: this.f.FIFTYDOLLARS.value,
      HUNDREDDOLLARS: this.f.HUNDREDDOLLARS.value,
      FIVEDOLLARS: this.f.FIVEDOLLARS.value,
      TENDOLLARS: this.f.TENDOLLARS.value,
      TWENTYDOLLARS: this.f.TWENTYDOLLARS.value,
      // address
      ADDRESS1: this.f.ADDRESS1.value,
      POSTCODE: this.f.POSTCODE.value,
      STATE_: this.f.STATE_.value,
      SUBURB: this.f.SUBURB.value,
    }
    this.isspiner = true;
    let finalData = { DATA: data, FormAction: 'insert', VALIDATEONLY: true }
    this._mainAPiServiceService.getSetData(finalData, 'SetTrustTransaction').subscribe(response => {
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.checkValidation(response.DATA.VALIDATIONS, finalData);
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.checkValidation(response.DATA.VALIDATIONS, finalData);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.checkValidation(response.DATA.VALIDATIONS, finalData);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      } else {
        this.isspiner = false;
      }
    }, err => {
      this.toastr.error(err);
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
      }
      else if (value.VALUEVALID == 'Warning') {
        tempWarning[value.FIELDNAME] = value;
        warningData.push(value.ERRORDESCRIPTION);
      }
    });
    this.errorWarningData = { "Error": tempError, 'Warning': tempWarning };
    if (Object.keys(errorData).length != 0) {
      this.toastr.error(errorData);
      this.isspiner = false;
    } else if (Object.keys(warningData).length != 0) {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        disableClose: true,
        width: '100%',
        data: warningData
      });
      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to Save?';
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isspiner = true;
          this.trustMoneyData(details);
        }
        this.confirmDialogRef = null;
      });
    } else if (Object.keys(warningData).length == 0 && Object.keys(errorData).length == 0) {
      this.trustMoneyData(details);
      this.isspiner = false;
    }
  }
  trustMoneyData(data: any) {
    data.VALIDATEONLY = false;
    this._mainAPiServiceService.getSetData(data, 'SetTrustTransaction').subscribe(response => {
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.toastr.success('save successfully');
        this.isspiner = false;
        this.dialogRef.close(true);
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.toastr.warning(response.MESSAGE);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.toastr.error(response.MESSAGE);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      }
      this.isspiner = false;
    }, error => {
      this.toastr.error(error);
    });
  }
  editInnerTable(val,Index){

  }
  addMatterItem(){


  }
}
