import { Component, OnDestroy, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';

//import { MattersService } from '../matters.service';
import { SortingDialogComponent } from '../../../sorting-dialog/sorting-dialog.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MattersService, TableColumnsService } from '../../../../_services';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-matters-list',
  templateUrl: './matters-list.component.html',
  styleUrls: ['./matters-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MattersListComponent implements OnInit, OnDestroy {
  [x: string]: any;
  highlightedRows: any;
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  displayedColumns = ['matter_num', 'matter', 'unbilled', 'invoiced', 'received', 'unpaid', 'total_value'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  mattersData: any;
  lastFilter = {};
  isLoadingResults: any = false;

  @Output() matterDetail: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private dialog: MatDialog,
    private _mattersService: MattersService,
    private toastr: ToastrService,
    private TableColumnsService: TableColumnsService,
  ) {
    if (JSON.parse(localStorage.getItem('matter_filter'))) {
      this.lastFilter = JSON.parse(localStorage.getItem('matter_filter'));
    }
    // this.highlightedRows = JSON.parse(localStorage.getItem('set_active_matters')).MATTERGUID
  }

  ngOnInit(): void {
    this.TableColumnsService.getTableFilter('Matters').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        let data = this.TableColumnsService.filtertableColum(response.DATA.COLUMNS, 'matterColumns');
        // this.displayedColumns = data.showcol;
        // this.ColumnsObj = data.colobj;
        //       displayedColumns = [];
        // ColumnsObj = [];
      }
    }, error => {
      this.toastr.error(error);
    });
    this.getMatterList(this.lastFilter);
  }
  ngOnDestroy(): void { }

  editmatter(matters) {
    this.matterDetail.emit(matters);
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { 'data': ['matter_num', 'matter', 'unbilled', 'invoiced', 'received', 'unpaid', 'total_value'], 'type': 'matters' };
    //open pop-up
    const dialogRef = this.dialog.open(SortingDialogComponent, dialogConfig);
    //Save button click

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem(dialogConfig.data.type, JSON.stringify(result));
      }
    });
    dialogRef.afterClosed().subscribe(data =>
      this.tableSetting(data)
    );
  }
  getMatterList(data) {
    this.isLoadingResults = true;
    this._mattersService.getMatters(data).subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        if (response.DATA.MATTERS[0]) {
          this.highlightedRows = response.DATA.MATTERS[0].MATTERGUID;
          this.matterDetail.emit(response.DATA.MATTERS[0]);
        }
        this.mattersData = new MatTableDataSource(response.DATA.MATTERS);
        this.mattersData.paginator = this.paginator;
        this.isLoadingResults = false;
      }
    }, error => {
      this.toastr.error(error);
    });
  }
  tableSetting(data: any) {
    if (data !== false) {
      this.displayedColumns = data;
      this.getMatterList(this.lastFilter);
    }
  }
  toggleRow(value: any) {
  }
}






