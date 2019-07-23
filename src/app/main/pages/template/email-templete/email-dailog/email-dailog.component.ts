import { Component, OnInit, Inject ,ViewChild} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatDialogConfig } from '@angular/material';
import { MatSort } from '@angular/material'
import {  MainAPiServiceService } from 'app/_services';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

// export interface PeriodicElement {
//   Name: string;
//   Description: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { Name: 'Amit', Description: 'Hydrogen'},
//   { Name: 'Karan', Description: 'Helium'},
//   { Name: 'Jay', Description: 'Lithium'},
//   { Name: 'Kalpesh', Description: 'Beryllium'},

// ];

@Component({
  selector: 'app-email-dailog',
  templateUrl: './email-dailog.component.html',
  styleUrls: ['./email-dailog.component.scss']
})
export class EmailDailogComponent implements OnInit {
  EmailTemplete:FormGroup;
  rowdata:any=[];
  highlightedRows:any;
  InnerTableData:any=[];
  confirmDialogRef: any;
  errorWarningData: any = {};
  isLoadingResults: boolean = false;
  action: string;
  dialogTitle: string;
  isspiner: boolean = false;
  GetData:any=[];
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  Name = this.theme_type == "theme-default" ? 'Solicitor' : 'Client';
  displayedColumns: string[] = ['NAME', 'DESCRIPTION'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  To_options: string[] = ['<i:mc-email>', '<i:f-email>', '<i:mcs-email>','<i:s-email>'];
  CC_options: string[] = ['<i:mc-email>', '<i:f-email>', '<i:mcs-email>','<i:s-email>'];
  BCC_options: string[] = ['<i:mc-email>', '<i:f-email>', '<i:mcs-email>','<i:s-email>'];
  SUb_options: string[] = ['<i:mc-email>', '<i:f-email>', '<i:mcs-email>','<i:s-email>'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  FormAction: string;
  GUID: string;
  constructor(
    public MatDialog: MatDialog,
    public dialogRef: MatDialogRef<EmailDailogComponent>,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public _matDialog: MatDialog,
    private _mainAPiServiceService: MainAPiServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  { 
    this.action = data.action;

  }
  ngOnInit() {
    this.EmailTemplete = this._formBuilder.group({
      name:[],
      ToEmail:[],
      CCEmail:[],
      BCCEmail:[],
      subject:[],
      attachment:[],
      text:[],
   
    });
    this.innerTable();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if(this.action === 'new'){
      this.dialogTitle = 'New Email';
    }else if(this.action === 'edit'){
      this.dialogTitle = 'Edit Email';
      let ShowData =JSON.parse(localStorage.getItem('GenerateEmailData'));
      // this.GetData=ShowData;
      this.EmailTemplete.controls['name'].setValue(ShowData.NAME);
      this.EmailTemplete.controls['ToEmail'].setValue(ShowData.TOADDRESS);
      this.EmailTemplete.controls['attachment'].setValue(ShowData.ATTACHMENT);
      this.EmailTemplete.controls['BCCEmail'].setValue(ShowData.BCCADDRESS);
      this.EmailTemplete.controls['CCEmail'].setValue(ShowData.CCADDRESS);
      this.EmailTemplete.controls['subject'].setValue(ShowData.SUBJECT);
      this.EmailTemplete.controls['text'].setValue(ShowData.TEXT_);
    }else{
      this.dialogTitle = 'Copy Document';
    }

    
  }
  innerTable(){
    this.isLoadingResults = true;
      this._mainAPiServiceService.getSetData({"TEMPLATETYPE":'Email'}, 'TemplateFieldList').subscribe(res=>{
      console.log(res);
      this.InnerTableData = new MatTableDataSource(res.DATA.FIELDS);
      this.InnerTableData.paginator = this.paginator;
      this.InnerTableData.sort = this.sort;
      this.highlightedRows =0;
      this.isLoadingResults = false;
    })
  }
  //Dcoument Floder
  DcoumentFloder(){
    console.log('DcoumentFloder work!!!');
  }
  //CloseEmail
  CloseEmail(){
    this.dialogRef.close(false);
  }
  //clicktable
  clicktable(val){
 this.rowdata=val;
  }
  get f() {
    return this.EmailTemplete.controls;
  }
    //Email Save
    EmailSave(){
      let ShowData =JSON.parse(localStorage.getItem('GenerateEmailData'));
      // console.log(this.rowdata);
      if(this.action=='edit'){
        this.GUID=ShowData.EMAILGUID;
        this.FormAction='update';
      }else{
        this.FormAction='insert';
        this.GUID=" ";
      }
      this.isspiner = true;
    let passdata={
      EMAILGUID:this.GUID,
      ATTACHMENT:this.f.attachment.value,
      BCCADDRESS:this.f.BCCEmail.value,
      CCADDRESS:this.f.CCEmail.value,
      NAME:this.f.name.value,
      SUBJECT:this.f.subject.value,
      TEXT:this.f.text.value,
      TOADDRESS:this.f.ToEmail.value,
      
    }
   
    
    let details = { FormAction: this.FormAction, VALIDATEONLY: true, Data: passdata };
   
    this._mainAPiServiceService.getSetData(details, 'SetEmail').subscribe(response => {
      if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
        this.checkValidation(response.DATA.VALIDATIONS, details);
      } else if (response.CODE == 451 && response.STATUS == "warning") {
        this.checkValidation(response.DATA.VALIDATIONS, details);
      } else if (response.CODE == 450 && response.STATUS == "error") {
        this.checkValidation(response.DATA.VALIDATIONS, details);
      } else if (response.MESSAGE == "Login Failure") {
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
        if (value.VALUEVALID == 'No'){
          errorData.push(value.ERRORDESCRIPTION);
          tempError[value.FIELDNAME] = value;
        }
        else if (value.VALUEVALID == 'Warning'){
          tempWarning[value.FIELDNAME] = value;
          warningData.push(value.ERRORDESCRIPTION);
        }
       
      });
      this.errorWarningData = { "Error": tempError, "Warning": tempWarning };
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
            this.SetEmailData(details);
          }
          this.confirmDialogRef = null;
        });
      }
      if (Object.keys(warningData).length == 0 && Object.keys(errorData).length == 0)
        this.SetEmailData(details);
      this.isspiner = false;
    }
    SetEmailData(data: any) {
      data.VALIDATEONLY = false;
      this._mainAPiServiceService.getSetData(data, 'SetEmail').subscribe(response => {
        if (response.CODE == 200 && (response.STATUS == "OK" || response.STATUS == "success")) {
          if (this.action !== 'edit') {
            this.toastr.success(' save successfully');
          } else {
            this.toastr.success(' update successfully');
          }
          this.isspiner = false;
          this.dialogRef.close(true);
        } else if (response.CODE == 451 && response.STATUS == "warning") {
          this.toastr.warning(response.MESSAGE);
        } else if (response.CODE == 450 && response.STATUS == "error") {
          this.toastr.error(response.MESSAGE);
        } else if (response.MESSAGE == "Login Failure") {
          this.dialogRef.close(false);
        }
        this.isspiner = false;
      }, error => {
        this.toastr.error(error);
      });
    }

}
