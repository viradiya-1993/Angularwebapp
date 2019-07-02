import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ContactService, TemplateListDetails, TableColumnsService } from 'app/_services';
import { fuseAnimations } from '@fuse/animations';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { MatterDialogComponentForTemplate } from '../matter-dialog/matter-dialog.component';
import { ContactSelectDialogComponent } from '../../contact/contact-select-dialog/contact-select-dialog.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TemplateListComponent implements OnInit {
  displayedColumns: any = ['TEMPLATETYPE', 'TEMPLATENAME'];
  //displayedColumns: string[];
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  highlightedRows: any;
  currentMatterData: any;
  Templatedata: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults: boolean;
  pageSize: any;
  abc: number;
  parentMessage: any;
  @Output() matterDetail: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private toastr: ToastrService,
    public _getContact: ContactService,
    public TemplateListData: TemplateListDetails,
    public MatDialog: MatDialog,
    private TableColumnsService: TableColumnsService,
    private router: Router,
    public _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    // let i=0;
    $('.example-containerdata').css('height', ($(window).height() - ($('#tool_baar_main').height() + $('.sticky_search_div').height() + 130)) + 'px');
    this.LoadData({})


  }
  LoadData(d) {
    this.isLoadingResults = true;
    this.TemplateListData.getTemplateList(d).subscribe(response => {

      if (response.CODE == 200 && response.STATUS == "success") {
        this.Templatedata = new MatTableDataSource(response.DATA.TEMPLATES);
        this.editContact(response.DATA.TEMPLATES[0]);
        this.Templatedata.paginator = this.paginator;
        this.Templatedata.sort = this.sort;
        if (response.DATA.TEMPLATES[0]) {
          // localStorage.setItem('contactGuid', response.DATA.CONTACTS[0].CONTACTGUID);
          this.highlightedRows = response.DATA.TEMPLATES[0].TEMPLATENAME;
        }
        this.isLoadingResults = false;
      }
    }, err => {

      this.toastr.error(err);
      this.isLoadingResults = false;
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }

  onSearch(searchFilter: any) {
    if (searchFilter['key'] === "Enter" || searchFilter == 'Enter') {

    }
  }
  editContact(Row: any) {
    if (Row.TEMPLATETYPE == "Folder") {
      $('#clickToolbarbtn').click();
      localStorage.setItem('handelGenerateDoc', 'Folder');
    } else {
      $('#clickToolbarbtn2').click();
      localStorage.setItem('handelGenerateDoc', 'Template');
    }
    this.parentMessage = Row;
    this.matterDetail.emit(Row);
    localStorage.setItem('templateData', JSON.stringify(Row));
    this.currentMatterData = Row;

  }
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    localStorage.setItem('lastPageSize', event.pageSize);
  }
  selectMatter(data) {

    if (data.TEMPLATETYPE == "Folder") {
      this.LoadData({ "Folder": data.TEMPLATENAME });
    } else if (data.TEMPLATETYPE == "Sub Folder") {
      this.LoadData({ "Sub Folder": data.TEMPLATENAME });
    }
    else {

      this.openDilog()
    }
  }
  openDilog() {
    let templateData = JSON.parse(localStorage.getItem('templateData'));
    if (this.router.url == "/create-document/invoice-template") {
      let invoiceGUid = localStorage.getItem('edit_invoice_id');
      let passdata = {
        'Context': "Invoice",
        'ContextGuid': invoiceGUid,
        "Type": "Template",
        "Folder": '',
        "Template": templateData.TEMPLATENAME
      }
      const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, {
        width: '100%',
        disableClose: true,
        data: passdata,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          localStorage.setItem('set_active_matters', JSON.stringify(result));

        }
      });

    } else if (this.router.url == "/create-document/matter-template") {
      let matterData = JSON.parse(localStorage.getItem('set_active_matters'));
      let passdata = {
        'Context': "Matter",
        'ContextGuid': matterData.MATTERGUID,
        "Type": "Template",
        "Folder": '',
        "Template": templateData.TEMPLATENAME
      }
      const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, {
        width: '100%',
        disableClose: true,
        data: passdata
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          localStorage.setItem('set_active_matters', JSON.stringify(result));

        }
      });
    } else if (this.router.url == "/create-document/receive-money-template") {
      let ReceiptData = JSON.parse(localStorage.getItem('receiptData'));
      let passdata = {
        'Context': "Income",
        'ContextGuid': ReceiptData.INCOMEGUID,
        "Type": "Template",
        "Folder": '',
        "Template": templateData.TEMPLATENAME
      }
      const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, {
        width: '100%',
        disableClose: true,
        data: passdata
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          localStorage.setItem('set_active_matters', JSON.stringify(result));

        }
      });
    } else if (this.router.url == "/create-document/contact-template") {
      let ContactGuID = localStorage.getItem('contactGuid');
      let passdata = {
        'Context': "Income",
        'ContextGuid': ContactGuID,
        "Type": "Template",
        "Folder": '',
        "Template": templateData.TEMPLATENAME
      }
      const dialogRef = this._matDialog.open(MatterDialogComponentForTemplate, {
        width: '100%',
        disableClose: true,
        data: passdata
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // localStorage.setItem('set_active_matters', JSON.stringify(result));

        }
      });
    }

  }
  ContactMatter() {
    const dialogRef = this.MatDialog.open(ContactSelectDialogComponent, {
      width: '100%', disableClose: true, data: {
        type: ""
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
