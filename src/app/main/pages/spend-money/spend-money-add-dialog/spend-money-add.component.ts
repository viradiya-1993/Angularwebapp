import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ContactSelectDialogComponent } from '../../contact/contact-select-dialog/contact-select-dialog.component';
import { MatterDialogComponent } from '../../time-entries/matter-dialog/matter-dialog.component';
import * as $ from 'jquery';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MainAPiServiceService } from 'app/_services';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { round } from 'lodash';
@Component({
  selector: 'app-spend-money-add',
  templateUrl: './spend-money-add.component.html',
  styleUrls: ['./spend-money-add.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SpendMoneyAddComponent implements OnInit {
  errorWarningData: any = {};
  dataSource: MatTableDataSource<UserData>;
  action: any;
  dialogTitle: string;
  isLoadingResults: boolean;
  spendmoneyForm: FormGroup;
  highlightedRows: any;
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  displayedColumnsTime: string[] = ['AMOUNT', 'EXPENDITURECLASS', 'GST', 'NOTE'];
  getDataForTable: any;
  paginator: any;
  pageSize: any;
  isspiner: boolean = false;
  paidtype = 'paid';
  classtype: any;
  size = 33.33;
  Bankhide: boolean = true;
  hide: boolean = true;
  tdata: boolean;
  getPayourarray: any = [];
  confirmDialogRef: any;
  expac: boolean;
  @ViewChild(MatSort) sort: MatSort;
  dataTableHide: string;
  sendItem: any = [];
  Main3btn: string;
  SubMain2btn: string;
  FormAction: string;
  FAmount: any = [];
  GSTValAfterCal: any;
  GstTypeDiff: any;
  GSTValForExGst: any;
  FinalTotal: any;
  FGst: any = [];
  FinalTotalGST: any;
  btnClickpurpose: string;
  INDEX: any;
  MainData: any;
  setMainAmount: number;
  setMainGST: number;
  multicheckboxval: number;
  isItemSaveClicked: string;
  constructor(public dialogRef: MatDialogRef<SpendMoneyAddComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    public MatDialog: MatDialog,
    private toastr: ToastrService,
    public _matDialog: MatDialog, public datepipe: DatePipe, public _mainAPiServiceService: MainAPiServiceService) {
    this.action = _data.action;

    this.dialogTitle = this.action === 'edit' ? 'Update Spend Money' : 'Add Spend Money';
    this.getPayee({});
  }
  ngOnInit() {
    //for Data Table hideshow 
    this.Main3btn = 'disabled';
    this.dataTableHide = "false";
    this.spendmoneyForm = this._formBuilder.group({
      DateIncurred: [''],
      Paid: [''],
      DatePaid: [''],
      Amount: [''],
      GST: [''],
      Bankac: [''],
      Notes: [''],
      Type: [''],
      ChequeNo: [''],
      Payee: [''],
      Invoice: [''],
      MultiLineExpense: [''],
      Class: [''],
      Matter: [''],
      AmountIncGST: [''],
      GSTType: [''],
      GST1: [''],
      AmountExGST: [''],
      Expenseac: [''],
      Note: [''],
      Assetacs: [''],
      Gstac: [''],
      taxac: [''],
      Equityac: [''],
      DatePaidForSend: [''],
      DateIncurredForSend: [''],
      MatterGUID: ['']
    });

    if (this.action == 'edit') {
      $('#expac').addClass('menu-disabled');
      this.expac = true;
      this.forEditshowpopupData();
    } else {
      this.forAddshowpopupData();
    }
  }

  forEditshowpopupData() {
    let SendMoney_data = JSON.parse(localStorage.getItem('spendMoney_data'));

    let DatePaid = SendMoney_data.DATE.split("/");
    let DATE = new Date(DatePaid[1] + '/' + DatePaid[0] + '/' + DatePaid[2]);
    let DateIncurred = SendMoney_data.DATE.split("/");
    let ReceiveDATE = new Date(DateIncurred[1] + '/' + DateIncurred[0] + '/' + DateIncurred[2]);
    this.spendmoneyForm.controls['DateIncurred'].setValue(ReceiveDATE);
    this.spendmoneyForm.controls['DatePaid'].setValue(DATE);
    //for sending date 
    this.spendmoneyForm.controls['DateIncurredForSend'].setValue(SendMoney_data.ReceiveDATE);
    this.spendmoneyForm.controls['DatePaidForSend'].setValue(SendMoney_data.DATE);
    //call first row and datatble -> start
    this.getDataForTable = SendMoney_data.EXPENDITUREITEMS;
    this.highlightedRows = 0;
    this.getDataForTable.paginator = this.paginator;
    this.getDataForTable.sort = this.sort;

    this.spendmoneyForm.controls['GST1'].disable();
    this.paidtype = SendMoney_data.STATUS
    //globally value set 
    this.spendmoneyForm.controls['Notes'].setValue(SendMoney_data.NOTE);
    this.spendmoneyForm.controls['ChequeNo'].setValue(SendMoney_data.CHEQUENO);
    this.spendmoneyForm.controls['Type'].setValue(SendMoney_data.EXPENDITURETYPE);
    this.spendmoneyForm.controls['Payee'].setValue(SendMoney_data.PAYEE);
    this.spendmoneyForm.controls['Amount'].setValue(SendMoney_data.AMOUNT);
    this.spendmoneyForm.controls['GST'].setValue(SendMoney_data.GST);
    // inner item 
    if (SendMoney_data.EXPENDITUREITEMS.length != 0) {
      this.editMoney(SendMoney_data.EXPENDITUREITEMS[0], 0);
      this.spendmoneyForm.controls['Class'].setValue(SendMoney_data.EXPENDITUREITEMS[0].EXPENDITURECLASS);
      this.spendmoneyForm.controls['GST1'].setValue(SendMoney_data.EXPENDITUREITEMS[0].GST.toString());
      this.spendmoneyForm.controls['AmountIncGST'].setValue(SendMoney_data.EXPENDITUREITEMS[0].AMOUNT);
      this.spendmoneyForm.controls['Note'].setValue(SendMoney_data.EXPENDITUREITEMS[0].NOTE);
      this.spendmoneyForm.controls['Matter'].setValue(SendMoney_data.EXPENDITUREITEMS[0].SHORTNAME);

      if (round(SendMoney_data.EXPENDITUREITEMS[0].AMOUNT / 10) == round(SendMoney_data.EXPENDITUREITEMS[0].GST)) {
        this.spendmoneyForm.controls['GSTType'].setValue("1.1");
        this.GstTypeDiff = "1.1";
        this.amountCal();
      } else if (SendMoney_data.EXPENDITUREITEMS[0].GST == 0) {
        this.spendmoneyForm.controls['GSTType'].setValue("No GST");
        this.GstTypeDiff = "No GST";
        this.amountCal();
      } else if (SendMoney_data.EXPENDITUREITEMS[0].AMOUNT / 10 != SendMoney_data.EXPENDITUREITEMS[0].GST) {
        this.spendmoneyForm.controls['GSTType'].setValue("LessThen 10% GST");
        this.GstTypeDiff = "LessThen 10% GST";
        this.amountCal();
      } else {
        this.amountCal();
      }

    } else {
      this.spendmoneyForm.controls['Class'].setValue("");
      this.spendmoneyForm.controls['GST1'].setValue(" ");
      this.spendmoneyForm.controls['AmountIncGST'].setValue("");
      this.spendmoneyForm.controls['Note'].setValue(" ");
      this.spendmoneyForm.controls['Matter'].setValue(" ");
    }
    if (SendMoney_data.MULTILINE == 0) {
      this.spendmoneyForm.controls['MultiLineExpense'].setValue(0);
      if (SendMoney_data.EXPENDITUREITEMS.length != 0) {
        this.multilineCheckbox();
      }
    } else {
      this.spendmoneyForm.controls['MultiLineExpense'].setValue(1);
      this.multilineCheckbox();
    }
    this.Classtype(SendMoney_data.EXPENDITUREITEMS[0].EXPENDITURECLASS);
  }
  forAddshowpopupData() {
    this.isItemSaveClicked = 'no';
    this.getDataForTable = [];
    // let SendMoney_data = JSON.parse(localStorage.getItem('spendMoney_data'));

    this.spendmoneyForm.controls['DateIncurred'].setValue(new Date(), 'dd/MM/yyyy');
    this.spendmoneyForm.controls['DatePaid'].setValue(new Date(), 'dd/MM/yyyy');
    //for sending date 
    this.spendmoneyForm.controls['DateIncurredForSend'].setValue(this.datepipe.transform(new Date(), 'dd/MM/yyyy'));
    this.spendmoneyForm.controls['DatePaidForSend'].setValue(this.datepipe.transform(new Date(), 'dd/MM/yyyy'));
    this.spendmoneyForm.controls['ChequeNo'].setValue("0");
    this.spendmoneyForm.controls['Type'].setValue("Cash");
    this.spendmoneyForm.controls['Class'].setValue("Expense");
    this.spendmoneyForm.controls['GST1'].setValue(0.00);
    this.spendmoneyForm.controls['AmountIncGST'].setValue(0.00);
    this.spendmoneyForm.controls['GSTType'].setValue("1.1");
    this.GstTypeDiff = "1.1";
    this.spendmoneyForm.controls['GST1'].disable();
    this.spendmoneyForm.controls['GST'].setValue(0.0);
    this.Classtype("Expense");
  }
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    localStorage.setItem('lastPageSize', event.pageSize);
  }
  getPayee(postData) {
    this._mainAPiServiceService.getSetData(postData, 'GetContact').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        response.DATA.CONTACTS.forEach(element => {
          this.getPayourarray.push(element.CONTACTNAME);
        });
      }
    }, err => {
      this.toastr.error(err);
    });
  }
  // paid Type Dropdown
  Paidtype(paidvalue) {
    if (paidvalue === 'Paid') {
      this.Bankhide = false;
      $('#bank').removeClass('menu-disabled');
      this.spendmoneyForm.controls['DatePaid'].enable();
      this.spendmoneyForm.controls['Bankac'].enable();
      this.spendmoneyForm.controls['Type'].enable();
      this.spendmoneyForm.controls['ChequeNo'].enable();
    } else if (paidvalue === 'Unpaid') {
      this.Bankhide = true;
      $('#bank').addClass('menu-disabled');
      this.spendmoneyForm.controls['DatePaid'].disable();
      this.spendmoneyForm.controls['Bankac'].disable();
      this.spendmoneyForm.controls['Type'].disable();
      this.spendmoneyForm.controls['ChequeNo'].disable();
    }
  }
  Classtype(Classvalue) {
    this.classtype = Classvalue;
    if (Classvalue === 'Expense') {
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      if (this.action != 'edit') {
        this.hide = true;
        $("#mattersnew").addClass("menu-disabled");
        this.spendmoneyForm.controls['Matter'].disable();

      } else if (this.action === 'edit') {
        this.hide = true;
        this.expac = false;
        $("#mattersnew").addClass("menu-disabled");
        this.spendmoneyForm.controls['Matter'].disable();
      }
    } else if (Classvalue === 'Matter Expense') {
      this.hide = false;
      this.expac = false;
      $("#mattersnew").removeClass("menu-disabled");
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.forCommonEnable();
    } else if (Classvalue === 'Capital') {
      this.hide = true;
      this.expac = false;
      $("#mattersnew").addClass("menu-disabled");
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.spendmoneyForm.controls['Matter'].disable();
      // this.spendmoneyForm.controls['GSTType'].disable();

    } else if (Classvalue === 'Pay GST') {
      this.hide = true;
      $("#mattersnew").addClass("menu-disabled");
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.spendmoneyForm.controls['Matter'].disable();
      this.spendmoneyForm.controls['GSTType'].disable();

    } else if (Classvalue === 'Pay Tax') {
      this.hide = true;
      this.expac = false;
      $("#mattersnew").addClass("menu-disabled");
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.spendmoneyForm.controls['Matter'].disable();
      this.spendmoneyForm.controls['GSTType'].disable();

    } else if (Classvalue === 'Personal') {
      this.hide = true;
      this.expac = false;
      $("#mattersnew").addClass("menu-disabled");
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.spendmoneyForm.controls['Matter'].disable();
      this.spendmoneyForm.controls['GSTType'].disable();


    } else if (Classvalue === 'Description') {
      this.hide = true;
      this.expac = false;
      $("#mattersnew").addClass("menu-disabled");
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.spendmoneyForm.controls['Matter'].disable();
      this.spendmoneyForm.controls['GSTType'].disable();

    } else if (Classvalue === 'Others') {
      this.hide = true;
      this.expac = false;
      $("#mattersnew").addClass("menu-disabled");
      this.spendmoneyForm.controls['Matter'].setValue('');
      this.spendmoneyForm.controls['MatterGUID'].setValue('');
      this.spendmoneyForm.controls['Matter'].disable();
      this.spendmoneyForm.controls['GSTType'].disable();
    }
  }
  ContactMatter() {
    const dialogRef = this.MatDialog.open(ContactSelectDialogComponent, {
      width: '100%', disableClose: true, data: {
        type: ""
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.spendmoneyForm.controls['Payee'].setValue(result.CONTACTNAME);
    });
  }
  public selectMatter() {
    const dialogRef = this.MatDialog.open(MatterDialogComponent, { width: '100%', disableClose: true, data: null });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spendmoneyForm.controls['Matter'].setValue(result.MATTER);
        this.spendmoneyForm.controls['MatterGUID'].setValue(result.MATTERGUID);
      }
    });
  }
  get f() {
    return this.spendmoneyForm.controls;
  }
  commmonDisabled() {
    this.spendmoneyForm.controls['Class'].disable();
    this.spendmoneyForm.controls['GSTType'].disable();
    this.spendmoneyForm.controls['Matter'].disable();
    this.spendmoneyForm.controls['Note'].disable();
    this.spendmoneyForm.controls['AmountIncGST'].disable();
    this.spendmoneyForm.controls['Expenseac'].disable();
  }
  forCommonEnable() {
    if (this.classtype == 'Matter Expense') {
      this.spendmoneyForm.controls['Matter'].enable();
    }
    this.spendmoneyForm.controls['Class'].enable();
    this.spendmoneyForm.controls['GSTType'].enable();
    this.spendmoneyForm.controls['Note'].enable();
    this.spendmoneyForm.controls['AmountIncGST'].enable();
    this.spendmoneyForm.controls['Expenseac'].enable();
  }

  multilineCheckbox() {
    this.size = 20;
    let SendMoney_data = JSON.parse(localStorage.getItem('spendMoney_data'));
    if (this.f.MultiLineExpense.value == true) {
      this.dataTableHide = "yes";
      this.Main3btn = 'enable';
      this.SubMain2btn = 'disabled';
      this.commmonDisabled();
    }
    else {
      this.size = 33.33;
      this.Main3btn = 'disabled';
      this.SubMain2btn = 'enable';
      this.dataTableHide = "false";
      if (this.action != 'edit') {
        this.commonEmptyFiild();
        // this.spendmoneyForm.controls['Class'].setValue(this.f.Class.value);
        // this.spendmoneyForm.controls['GST1'].setValue(this.f.GST1.value);
        // this.spendmoneyForm.controls['AmountExGST'].setValue(this.f.AmountExGST.value);
        // this.spendmoneyForm.controls['Note'].setValue(this.f.Note.value);
        // this.spendmoneyForm.controls['AmountIncGST'].setValue(this.f.AmountIncGST.value);
        // this.spendmoneyForm.controls['Expenseac'].setValue(this.f.Expenseac.value);
      } 
      // else if (this.action == 'edit' && SendMoney_data.MULTILINE == 1) {
      //   this.commonEmptyFiild();
      // }
      else {
        this.spendmoneyForm.controls['Class'].setValue(SendMoney_data.EXPENDITUREITEMS[0].EXPENDITURECLASS);
        this.spendmoneyForm.controls['GST1'].setValue(SendMoney_data.EXPENDITUREITEMS[0].GST.toString());
        this.spendmoneyForm.controls['Note'].setValue(SendMoney_data.EXPENDITUREITEMS[0].NOTE);
        this.spendmoneyForm.controls['AmountIncGST'].setValue(SendMoney_data.EXPENDITUREITEMS[0].AMOUNT.toString());
        this.spendmoneyForm.controls['Expenseac'].setValue('');
        this.spendmoneyForm.controls['AmountExGST'].setValue(SendMoney_data.EXPENDITUREITEMS[0].AMOUNT - SendMoney_data.EXPENDITUREITEMS[0].GST);
        if (round(SendMoney_data.EXPENDITUREITEMS[0].AMOUNT / 10) == round(SendMoney_data.EXPENDITUREITEMS[0].GST)) {
          this.spendmoneyForm.controls['GSTType'].setValue("1.1");
          this.GstTypeDiff = "1.1"
          this.amountCal();
        } else if (SendMoney_data.EXPENDITUREITEMS[0].GST == 0) {
          this.spendmoneyForm.controls['GSTType'].setValue("No GST");
          this.GstTypeDiff = "No GST"
          this.amountCal();
        } else if (SendMoney_data.EXPENDITUREITEMS[0].AMOUNT / 10 == SendMoney_data.EXPENDITUREITEMS[0].GST) {
          this.spendmoneyForm.controls['GSTType'].setValue("LessThen 10% GST");
          this.GstTypeDiff = "LessThen 10% GST"
          this.amountCal();
        }
      }
      this.forCommonEnable();
      this.Classtype(this.classtype);
    }
  }
  GstTypeforSelect(val) {
    this.GstTypeDiff = val;
    this.amountCal();
    if (val == "LessThen 10% GST") {
      this.spendmoneyForm.controls['GST1'].enable();
    } else if (val == "No GST") {
      this.spendmoneyForm.controls['GST1'].disable();
      this.spendmoneyForm.controls['GST1'].setValue("");
    } else if (val == "10") {
      this.spendmoneyForm.controls['GST1'].disable();
      this.spendmoneyForm.controls['GST1'].setValue("10");
    }
  }
  selectSpendMoneyId(row) {
  }
  commonEmptyFiild() {
    this.spendmoneyForm.controls['GSTType'].setValue("1.1");
    this.spendmoneyForm.controls['AmountIncGST'].setValue(0.00);
    this.spendmoneyForm.controls['GST1'].setValue(0.00);
    this.spendmoneyForm.controls['AmountExGST'].setValue(0.00);
    this.GSTValForExGst=0.00;
    this.spendmoneyForm.controls['Class'].setValue("Expense");
    this.spendmoneyForm.controls['Note'].setValue(" ");
  }
  AddMoneyItem() {
    this.commonEmptyFiild();
    this.GstTypeDiff = "1.1";
    this.SubMain2btn = 'enable';
    this.Main3btn = 'disabled';
    this.forCommonEnable();
    this.Classtype(this.classtype);
  }
  SaveItemDialog() {
    this.isItemSaveClicked = 'yes';
    this.SubMain2btn = 'disabled';
    this.commmonDisabled();
    this.Main3btn = 'enable';
    if (this.btnClickpurpose == 'edit') {
      this.getDataForTable[this.INDEX].EXPENDITURECLASS = this.f.Class.value;
      this.getDataForTable[this.INDEX].GST = this.f.GST1.value;
      this.getDataForTable[this.INDEX].AMOUNT = this.f.AmountIncGST.value;
      this.getDataForTable[this.INDEX].MATTERGUID = this.f.MatterGUID.value;
      this.getDataForTable[this.INDEX].SHORTNAME = this.f.Matter.value;
      this.getDataForTable[this.INDEX].NOTE = this.f.Note.value;
      this.btnClickpurpose = 'save';
      this.globallyCalculation();
    }
    else {
      this.getDataForTable.push({
        EXPENDITURECLASS: this.f.Class.value,
        AMOUNT: this.f.AmountIncGST.value,
        GST: this.f.GST1.value,
        EXPENDITUREGUID: '',
        MATTERGUID: this.f.MatterGUID.value,
        SHORTNAME: this.f.Matter.value,
        NOTE: this.f.Note.value
      });
      this.globallyCalculation();

    }
    this.highlightedRows = 0;
    this.editMoney(this.getDataForTable[0], 0);
  }
  globallyCalculation() {
    this.FAmount = [];
    this.FGst = [];
    this.getDataForTable.forEach(element => {
      this.FAmount.push(element.AMOUNT);
      this.FGst.push(Number(element.GST));
    });
    this.FinalTotal = Number(this.FAmount.reduce(function (a = 0, b = 0) { return a + b; }, 0));
    this.FinalTotalGST = Number(this.FGst.reduce(function (a = 0, b = 0) { return a + b; }, 0));
    this.spendmoneyForm.controls['Amount'].setValue(parseFloat(this.FinalTotal).toFixed(2));
    this.spendmoneyForm.controls['GST'].setValue(parseFloat(this.FinalTotalGST).toFixed(2));
  }
  clicktitle() {
  }
  Cashtype(val) {
    if (val == "Cheque") {
      this.spendmoneyForm.controls['ChequeNo'].setValue("1");
    } else {
      this.spendmoneyForm.controls['ChequeNo'].setValue("0");
    }
  }
  editElement() {
    this.forCommonEnable();
    this.btnClickpurpose = "edit";
    this.SubMain2btn = 'enable';
  }
  editMoney(row, index) {
    this.MainData = row;
    this.INDEX = index;
    this.spendmoneyForm.controls['AmountIncGST'].setValue(row.AMOUNT);
    this.spendmoneyForm.controls['Class'].setValue(row.EXPENDITURECLASS);
    this.spendmoneyForm.controls['GST1'].setValue(row.GST);
    this.spendmoneyForm.controls['Note'].setValue(row.NOTE);
    this.spendmoneyForm.controls['Matter'].setValue(row.SHORTNAME);
    this.commmonDisabled();
  }
  deleteElement() {
    this.getDataForTable.splice(this.INDEX, 1);
    this.globallyCalculation();
    this.commonEmptyFiild();
    this.commmonDisabled();
    if (this.getDataForTable.length != 0) {
      this.highlightedRows = 0;
      this.editMoney(this.getDataForTable[0], 0);
    }
  }
  CancelItemDialog() {
    this.SubMain2btn = 'disabled';
    this.Main3btn = 'enable';
    this.commmonDisabled();

  }
  amountCal() {
    let amount = this.f.AmountIncGST.value;
    let cal: any = (this.f.AmountIncGST.value / 1.1).toFixed(2);
    if (this.GstTypeDiff == "No GST") {
      this.GSTValForExGst = amount;
      this.spendmoneyForm.controls['GST1'].setValue("");
    } else if (this.GstTypeDiff == "1.1") {
      this.GSTValAfterCal = (amount - cal).toFixed(2);
      this.GSTValForExGst = cal;
    } else if (this.GstTypeDiff == "LessThen 10% GST") {
      this.GSTValAfterCal = 0;
      this.GSTValForExGst = amount;
    }
  }
  GSTCalFun() {
    this.GSTValForExGst = round(this.f.AmountIncGST.value - this.f.GST1.value).toFixed(2);
  }
  choosedDateForIncurred(type: string, event: MatDatepickerInputEvent<Date>) {
    let begin = this.datepipe.transform(event.value, 'dd/MM/yyyy');
    this.spendmoneyForm.controls['DateIncurredForSend'].setValue(begin);
  }
  choosedDateForPaid(type: string, event: MatDatepickerInputEvent<Date>) {
    let begin = this.datepipe.transform(event.value, 'dd/MM/yyyy');
    this.spendmoneyForm.controls['DatePaidForSend'].setValue(begin);
  }

  Addspendmoney() {
    this.forCommonEnable();
  }
  CommonSendOneLineData() {
    this.setMainAmount = Number(this.f.AmountIncGST.value);
    this.setMainGST = Number(this.f.GST1.value);
    this.sendItem.push({
      AMOUNT: Number(this.f.AmountIncGST.value),
      EXPENDITURECLASS: this.f.Class.value,
      EXPENDITUREGUID: '',
      EXPENDITUREITEMGUID: "",
      EXPENSEACCOUNTGUID: "",
      GST: Number(this.f.GST1.value),
      MATTERGUID: this.f.MatterGUID.value,
      NOTE: this.f.Note.value,
      SHORTNAME: this.f.Matter.value,
      WORKITEMGUID: ""
    });
  }
  commonSendMultiLineData() {
    this.setMainAmount = this.FinalTotal;
    this.setMainGST = this.FinalTotalGST;
    this.getDataForTable.forEach(element => {
      this.sendItem.push({
        AMOUNT: Number(element.AMOUNT),
        EXPENDITURECLASS: element.EXPENDITURECLASS,
        EXPENDITUREGUID: '',
        EXPENDITUREITEMGUID: "",
        EXPENSEACCOUNTGUID: "",
        GST: Number(element.GST),
        MATTERGUID: element.MATTERGUID,
        NOTE: element.NOTE,
        SHORTNAME: element.SHORTNAME,
        WORKITEMGUID: ""
      })
    });
  }
  FinalSaveData() {
    let SendMoney_data = JSON.parse(localStorage.getItem('spendMoney_data'));
    if (this.action != 'edit' && this.f.MultiLineExpense.value == false) {
      this.CommonSendOneLineData();

    } else if (this.action != 'edit' && this.f.MultiLineExpense.value == true && this.isItemSaveClicked == 'no') {
      this.CommonSendOneLineData();
    } else if (this.action != 'edit' && this.f.MultiLineExpense.value == true && this.isItemSaveClicked == 'yes') {
      this.commonSendMultiLineData();
    } else if (this.action == 'edit' && SendMoney_data.MULTILINE == 1 && this.f.MultiLineExpense.value == true) {
      this.commonSendMultiLineData();
    } else if (this.action == 'edit' && SendMoney_data.MULTILINE == 1 && this.f.MultiLineExpense.value == false) {
      // first push and then get 
      // need to remove class from hml and show box 
      this.getDataForTable.push({
        AMOUNT: Number(this.f.AmountIncGST.value),
        EXPENDITURECLASS: this.f.Class.value,
        EXPENDITUREGUID: '',
        EXPENDITUREITEMGUID: "",
        EXPENSEACCOUNTGUID: "",
        GST: Number(this.f.GST1.value),
        MATTERGUID: this.f.MatterGUID.value,
        NOTE: this.f.Note.value,
        SHORTNAME: this.f.Matter.value,
        WORKITEMGUID: ""
      });
      this.commonSendMultiLineData();

    } else if (this.action == 'edit' && SendMoney_data.MULTILINE == 0 && this.f.MultiLineExpense.value == false) {
      this.CommonSendOneLineData();

    } else if (this.action == 'edit' && SendMoney_data.MULTILINE == 0 && this.f.MultiLineExpense.value == true) {
      this.commonSendMultiLineData();
    }
    // for multiline   
    if (this.f.MultiLineExpense.value == false) { this.multicheckboxval = 0; }
    else if (this.getDataForTable.length == 1 || this.getDataForTable.length == 0) { this.multicheckboxval = 0; }
    else { this.multicheckboxval = 1; }

    let Data = {
      EXPENDITUREGUID: this.action == 'edit' ? SendMoney_data.EXPENDITUREGUID : " ",
      EXPENDITURETYPE: this.f.Type.value,
      STATUS: this.f.Paid.value,
      CHEQUENO: this.f.ChequeNo.value,
      PAYEE: this.f.Payee.value,
      MULTILINE: this.multicheckboxval,
      AMOUNT: this.setMainAmount,
      GST: this.setMainGST,
      RECEIVEDDATE: this.f.DateIncurredForSend.value,
      DATE: this.f.DatePaidForSend.value,
      BANKACCOUNTGUID: 'ACCAAAAAAAAAAAA4',
      USERCODE: '',
      SOURCEREFERENCE: this.f.Invoice.value,
      NOTE: this.f.Notes.value,
      EXPENDITUREITEMS: this.sendItem
    }
    if (this.action == "edit") {
      this.FormAction = "update";
    } else {
      this.FormAction = "insert";
    }
    this.Setata(Data);
    this.isItemSaveClicked = 'no';
  }
  Setata(potData) {
    this.isspiner = true;
    let details = { FormAction: this.FormAction, VALIDATEONLY: true, Data: potData };
    this._mainAPiServiceService.getSetData(details, 'SetExpenditure').subscribe(response => {
      //array empty of save item
      this.sendItem = [];
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.checkValidation(response.DATA.VALIDATIONS, details);
      } else if (response.CODE == 451 && response.STATUS == 'warning') {
        this.checkValidation(response.DATA.VALIDATIONS, details);
      } else if (response.CODE == 450 && response.STATUS == 'error') {
        this.checkValidation(response.DATA.VALIDATIONS, details);
      } else if (response.MESSAGE == 'Not logged in') {
        this.dialogRef.close(false);
      } else {
        this.isspiner = false;
      }
    }, error => {
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
      }
      else if (value.VALUEVALID == 'Warning') {
        tempWarning[value.FIELDNAME] = value;
        warningData.push(value.ERRORDESCRIPTION);
      }

    });
    this.errorWarningData = { "Error": tempError, 'warning': tempWarning };
    if (Object.keys(errorData).length != 0)
      this.toastr.error(errorData);
    if (Object.keys(warningData).length != 0) {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        disableClose: true,
        width: '100%',
        data: warningData
      });
      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to Save?';
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isspiner = true;
          this.saveSpendMoneyData(details);
        }
        this.confirmDialogRef = null;
      });
    }
    if (Object.keys(warningData).length == 0 && Object.keys(errorData).length == 0)
      this.saveSpendMoneyData(details);
    this.isspiner = false;
  }
  saveSpendMoneyData(data: any) {
    data.VALIDATEONLY = false;
    this._mainAPiServiceService.getSetData(data, 'SetExpenditure').subscribe(response => {
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        if (this.action !== 'edit') {
          this.toastr.success(' save successfully');
        } else {
          this.toastr.success(' update successfully');
        }
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
}
export interface UserData {
  AMOUNT: string;
  EXPENDITURECLASS: string;
  GST: string;
  NOTE: string;
}