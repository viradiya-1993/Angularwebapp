import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from 'app/main/sorting-dialog/sorting-dialog.component';
import { TableColumnsService, MainAPiServiceService } from '../../../../_services';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-matter-trust',
  templateUrl: './matter-trust.component.html',
  styleUrls: ['./matter-trust.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MatterTrustComponent implements OnInit {
  currentMatter: any = JSON.parse(localStorage.getItem('set_active_matters'));
  displayedColumns: string[];
  isLoadingResults: boolean = false;
  ColumnsObj: any = [];
  pageSize: any;
  tempColobj: any;
  isDisplay: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
    private TableColumnsService: TableColumnsService,
    private _mainAPiServiceService: MainAPiServiceService,
    private toastr: ToastrService) { }

  MatterTrustdata;
  ngOnInit() {
    $('content').addClass('inner-scroll');
    $('.example-containerdata').css('height', ($(window).height() - ($('#tool_baar_main').height() + 140)) + 'px');
    this.getTableFilter();
    this.loadData();
  }
  getTableFilter() {
    this.TableColumnsService.getTableFilter('time and billing', 'trust').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        let data = this.TableColumnsService.filtertableColum(response.DATA.COLUMNS);
        this.displayedColumns = data.showcol;
        this.ColumnsObj = data.colobj;
        this.tempColobj = data.tempColobj;
      }
    }, error => {
      this.toastr.error(error);
    });
  }
  loadData() {
    this.MatterTrustdata=[];
    this.isLoadingResults = true;
    let potData = { 'MatterGUID': this.currentMatter.MATTERGUID,TRANSACTIONSTARTDATE:'28/05/2019',TRANSACTIONENDDATE:'28/11/2019' };
    this._mainAPiServiceService.getSetData(potData, 'GetTrustTransaction').subscribe(res => {
      if (res.CODE == 200 && res.STATUS == "success") {
        if (res.DATA.TRUSTTRANSACTIONS[0]) {
          this.isDisplay = false;
        } else {
          this.isDisplay = true;
        }
        let TRUSTTRANSACTIONS = res.DATA.TRUSTTRANSACTIONS;
        this.MatterTrustdata = new MatTableDataSource(TRUSTTRANSACTIONS);
        this.MatterTrustdata.paginator = this.paginator;
        this.MatterTrustdata.sort = this.sort;
      }
      this.isLoadingResults = false;
    }, err => {
      this.toastr.error(err);
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    localStorage.setItem('lastPageSize', event.pageSize);
  }
  refreshMatterInvoice(){
    this.loadData();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { 'data': this.ColumnsObj, 'type': 'time and billing', 'list': 'trust' };
    //open pop-up
    const dialogRef = this.dialog.open(SortingDialogComponent, dialogConfig);
    //Save button click
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayedColumns = result.columObj;
        this.ColumnsObj = result.columnameObj;
        this.tempColobj = result.tempColobj;
        if (!result.columObj) {
          this.MatterTrustdata = new MatTableDataSource([]);
          this.MatterTrustdata.paginator = this.paginator;
          this.MatterTrustdata.sort = this.sort;
          this.isDisplay = true;
        } else {
          this.loadData();
        }
      }
    });
  }
  tableSetting(data: any) {
    if (data !== false) {
      this.displayedColumns = data;
    }
  }

}
