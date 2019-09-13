import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from 'app/main/sorting-dialog/sorting-dialog.component';
import { TableColumnsService, MainAPiServiceService, BehaviorService } from './../../../../_services';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import {MatSort} from '@angular/material';

@Component({
  selector: 'app-file-notes',
  templateUrl: './file-notes.component.html',
  styleUrls: ['./file-notes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FileNotesComponent implements OnInit {
  currentMatter: any = JSON.parse(localStorage.getItem('set_active_matters'));
  displayedColumns: string[];
  isLoadingResults: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ColumnsObj: any[];
  pageSize: any;
  tempColobj: any;
  highlightedRows: any;
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  public FileNoteData = {
    "MatterName": '', "ContactName": '', "Search": '', 
  }

  constructor(private dialog: MatDialog, private TableColumnsService: TableColumnsService, 
    private _mainAPiServiceService: MainAPiServiceService,private toastr: ToastrService,
    public behaviorService: BehaviorService) { }
  filenotes_table;
  ngOnInit() {
    this.FileNoteData.MatterName = this.currentMatter.MATTER;
    this.FileNoteData.ContactName = this.currentMatter.CONTACTNAME;
    $('content').addClass('inner-scroll');
    $('.example-containerdata').css('height', ($(window).height() - ($('#tool_baar_main').height() + 140)) + 'px');
    this.getTableFilter();
    this.loadData();
  }
  loadData() {
    this.filenotes_table=[];
    this.isLoadingResults = true;
    let potData = { 'MatterGUID': this.currentMatter.MATTERGUID };
    this._mainAPiServiceService.getSetData(potData, 'GetFileNote').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        this.filenotes_table = new MatTableDataSource(response.DATA.FILENOTES);
        this.filenotes_table.paginator = this.paginator;
        this.filenotes_table.sort = this.sort;
        if (response.DATA.FILENOTES[0]) {
       
          this.highlightedRows = response.DATA.FILENOTES[0].FILENOTEGUID;
          this.RowClick(response.DATA.FILENOTES[0])
          //this.highlightedRows = response.DATA.TASKS[0].TASKGUID;
        } else {
          //this.toastr.error("No Data Selected");
        }
        // let FILENOTES = response.DATA.FILENOTES == null ? [] : response.DATA.FILENOTES;
      
       
      }
      this.isLoadingResults = false;
    }, error => {
      this.toastr.error(error);
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    localStorage.setItem('lastPageSize', event.pageSize);
  }
  getTableFilter() {
    this.TableColumnsService.getTableFilter('legal details', 'file notes').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        let data = this.TableColumnsService.filtertableColum(response.DATA.COLUMNS);
        this.displayedColumns = data.showcol;
        this.tempColobj = data.tempColobj;
        this.ColumnsObj = data.colobj;
      }
    }, error => {
      this.toastr.error(error);
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { 'data': this.ColumnsObj, 'type': 'legal details', 'list': 'file notes' };
    //open pop-up
    const dialogRef = this.dialog.open(SortingDialogComponent, dialogConfig);
    //Save button click
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayedColumns = result.columObj;
        this.ColumnsObj = result.columnameObj;
        this.tempColobj = result.tempColobj;
        if (!result.columObj) {
          this.filenotes_table = new MatTableDataSource([]);
          this.filenotes_table.paginator = this.paginator;
          this.filenotes_table.sort = this.sort;
        } else {
          this.loadData();
        }
      }
    });
  }
  RowClick(val){
    this.behaviorService.FileNotesData(val);
  }
  refreshFileNote(){
    this.loadData();
  }
}

