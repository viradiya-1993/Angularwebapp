import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';
import { TemplateListDetails } from 'app/_services';
import { MatTableDataSource, MatPaginator, MatDialogRef, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatterDialogComponentForTemplate } from 'app/main/pages/template/matter-dialog/matter-dialog.component';
import { Router } from '@angular/router';
// import { SystemSetting } from './../../../../_services';

@Component({
  selector: 'app-generate-template',
  templateUrl: './generate-template.component.html',
  styleUrls: ['./generate-template.component.scss'],
  animations: fuseAnimations
})
export class GenerateTemplatesDialoagComponent implements OnInit {
  @Input() SettingForm: FormGroup;
  displayedColumns: any = ['TEMPLATETYPE', 'TEMPLATENAME'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  isLoadingResults: boolean;
  Templatedata: any = [];
  getTemplateArray: any = [];
  highlightedRows: any;
  getDropDownValue: any = [];
  getRoeData:any=[];

  pageSize: any;
  constructor(public TemplateListData: TemplateListDetails, private toastr: ToastrService,
    public dialogRef: MatDialogRef<GenerateTemplatesDialoagComponent>,   public _matDialog: MatDialog,private router:Router ) { }

  ngOnInit() {
    this.LoadData({});
  }
  LoadData(data){
    this.isLoadingResults = true;

    this.TemplateListData.getTemplateList(data).subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        this.Templatedata = new MatTableDataSource(response.DATA.TEMPLATES);

        this.Templatedata.paginator = this.paginator;
        if (response.DATA.TEMPLATES[0]) {
          // localStorage.setItem('contactGuid', response.DATA.CONTACTS[0].CONTACTGUID);
          this.highlightedRows = response.DATA.TEMPLATES[0].TEMPLATENAME;
        }
        this.isLoadingResults = false;
      }
    }, err => {
      this.isLoadingResults = false;
      this.toastr.error(err);
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }
 
  FirstClickTemplate(data){
    this.getRoeData=data;
  }
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    localStorage.setItem('lastPageSize', event.pageSize);
  }
 
  dblclickrow(data) {
console.log("dbclick")
    if (data.TEMPLATETYPE == "Folder") {
      console.log("folder")
      this.LoadData({ "Folder": data.TEMPLATENAME });
    } else if (data.TEMPLATETYPE == "Sub Folder") {
      console.log("sub")
      this.LoadData({ "Sub Folder": data.TEMPLATENAME });
    }
    else {
      console.log("else")
      this.openDilog()
    }
  }
  openDilog() {
    console.log("dialog called")
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
  console.log("popup");
    const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, { width: '100%', disableClose: true, data: passdata });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            // localStorage.setItem('set_active_matters', JSON.stringify(result));
        }
    });
}
selectTemplate() {
   this.dialogRef.close( this.getRoeData.TEMPLATENAME);
}
}
