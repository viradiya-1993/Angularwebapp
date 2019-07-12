import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatDialog, } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import * as $ from 'jquery';
import { fuseAnimations } from '@fuse/animations';
import { TemplateListDetails ,TableColumnsService } from 'app/_services';
import { ToastrService } from 'ngx-toastr';
import { MatterDialogComponentForTemplate } from '../matter-dialog/matter-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-templete',
  templateUrl: './email-templete.component.html',
  styleUrls: ['./email-templete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations

})
export class EmailTempleteComponent implements OnInit {
  EmailAllData: FormGroup;
  tempColobj: any;
  ColumnsObj: any;
  TemplateEmaildata:any=[];
  isLoadingResults: boolean = false;
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  Title = this.theme_type == "theme-default" ? 'Solicitor' : 'Client';
  displayedColumns: any = ['TYPEICON', 'NAME'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  highlightedRows: any;
  pageSize: any;
  constructor(
    private _formBuilder: FormBuilder,
    public TemplateListData: TemplateListDetails,
    private toastr: ToastrService,
    private TableColumnsService: TableColumnsService,
    public _matDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.EmailAllData = this._formBuilder.group({
      Filter: [''],
      search: ['']
    });

    this.LoadData({});
    
  }
  // getTableFilter() {
  //   this.TableColumnsService.getTableFilter('generate email', '').subscribe(response => {
  //     console.log(response);
  //     if (response.CODE == 200 && response.STATUS == "success") {
  //       let data = this.TableColumnsService.filtertableColum(response.DATA.COLUMNS);
  //       this.tempColobj = data.tempColobj;
  //       this.displayedColumns = data.showcol;
  //       this.ColumnsObj = data.colobj;
  //     }
  //   }, error => {
  //     this.toastr.error(error);
  //   });
  // }
  LoadData(passdata){
    this.isLoadingResults = true;
    this.TemplateListData.getEmailList(passdata).subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        this.TemplateEmaildata = new MatTableDataSource(response.DATA.EMAILS);
        // this.editContact(response.DATA.TEMPLATES[0]);
        this.TemplateEmaildata.paginator = this.paginator;
        this.TemplateEmaildata.sort = this.sort;
        if (response.DATA.EMAILS[0]) {
         
          localStorage.setItem('GenerateEmailData', JSON.stringify(response.DATA.EMAILS[0]));
          this.highlightedRows = response.DATA.EMAILS[0].EMAILGUID;
        }
        this.isLoadingResults = false;
      }
    }, err => {

      this.toastr.error(err);
      this.isLoadingResults = false;
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }
  // FilterSearch
  FilterSearch(filterValue: any) {
    // this.EmailDataTbl.filter = filterValue;
  }
  //clicktitle
  clicktitle(row) {
    localStorage.setItem('GenerateEmailData', JSON.stringify(row));
  }
  //EmailDialog
  EmailDialog() {

  }
  dblclickEmail(row){
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
        let passdata = { 'Context': "Contact", 'ContextGuid': ContactGuID, "Type": "Template", "Email": '', "Template": templateData.NAME }
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


}

