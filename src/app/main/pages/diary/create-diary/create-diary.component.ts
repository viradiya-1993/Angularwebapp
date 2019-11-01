import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';
import { MainAPiServiceService, TimersService, TableColumnsService, BehaviorService } from './../../../../_services';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateDiaryComponent implements OnInit {
  isLoadingResults: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempColobj: any;
  ColumnsObj = [];
  createDiaryForm: any = {}
  // createDiaryForm={
  //   'Date Range':'','Date':'','Item':''
  // }
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  // displayedColumns: string[];
  selection = new SelectionModel<any>(true, []);
  TimerDataFordiary: any = [];
  highlightedRows: any;
  displayedColumns: string[] = ['select', 'APPOINTMENTDATE', 'APPOINTMENTTIME', 'DURATION', 'MATTERSHORTNAME',
  'APPOINTMENTTYPE', 'NOTE', 'PRICE', 'PRICEINCGST', 'GST'];
  pageSize: string;
  isDisplay: boolean = false;
  CreateDiaryArray: any=[];
  constructor(private _mainAPiServiceService: MainAPiServiceService,
    private Timersservice: TimersService,
    public datepipe: DatePipe,
    private behaviorService: BehaviorService,
    private TableColumnsService: TableColumnsService,
    private toastr: ToastrService, ) {
    // this.getTableFilter();
    this.LoadData();
  }

  ngOnInit() {
    this.createDiaryForm.Date = ({ begin: new Date(), end: new Date() });
    this.createDiaryForm.Search = "";
    this.createDiaryForm.Item = 'All Items';
  }
  helloFunction() {
    console.log(this.selection.selected);


  }
  isAllSelected() {
    if (this.TimerDataFordiary.length != 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.TimerDataFordiary.data.length;
      return numSelected === numRows;
    }

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.TimerDataFordiary.data.forEach(row => this.selection.select(row));
      this.CreateDiaryArray.push(this.selection.selected);
  }
  checkboxLabel(row?: any): string {
    if (this.TimerDataFordiary.length != 0) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

  }
//   APPOINTMENTENDDATE
// APPOINTMENTTIME
// DURATION
// MATTERSHORTNAME
// APPOINTMENTTYPE
// Description
// PRICE
// PRICEINCGST
// GST
  // getTableFilter() {
  //   this.TableColumnsService.getTableFilter('time entries', '').subscribe(response => {
  //     if (response.CODE == 200 && response.STATUS == "success") {
  //       let data = this.TableColumnsService.filtertableColum(response.DATA.COLUMNS);
  //       this.tempColobj = data.tempColobj;
  //       this.displayedColumns = data.showcol;
  //       this.displayedColumns.splice(0, 0, "select");
  //       this.ColumnsObj = data.colobj;
  //     }
  //   }, error => {
  //     this.toastr.error(error);
  //   });
  // }
  LoadData() {
    this.TimerDataFordiary = [];
    this.isLoadingResults = true;
    // this.Timersservice.getTimeEnrtyData({})
    // this._mainAPiServiceService.getSetData({ShowWhat: "CREATE WIP" }, 'GetAppointment')
    this._mainAPiServiceService.getSetData({ShowWhat: "CREATE WIP",TYPEFILTER:'All' }, 'GetAppointment').subscribe(response => {
      console.log(response);
      if (response.CODE == 200 && response.STATUS == "success") {
        this.TimerDataFordiary = new MatTableDataSource(response.DATA.APPOINTMENTS);
          this.TimerDataFordiary.paginator = this.paginator;
          this.TimerDataFordiary.sort = this.sort;
        if (response.DATA.APPOINTMENTS[0]) {
          // this.behaviorService.MainTimeEntryData(response.DATA.WORKITEMS[0]);
           this.isDisplay = false;
          this.highlightedRows = response.DATA.APPOINTMENTS[0].APPOINTMENTGUID;
          // localStorage.setItem('edit_WORKITEMGUID', this.highlightedRows);
        }else {
          this.isDisplay = true;
        }
        try {
          this.TimerDataFordiary = new MatTableDataSource(response.DATA.APPOINTMENTS);
          this.TimerDataFordiary.paginator = this.paginator;
          this.TimerDataFordiary.sort = this.sort;
        } catch (error) {
        }
      }
      this.isLoadingResults = false;
    }, err => {
      this.isLoadingResults = false;
      this.toastr.error(err);
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }
  DateRange1(type: string, event: MatDatepickerInputEvent<Date>) {

    let begin = this.datepipe.transform(event.value['begin'], 'dd/MM/yyyy');
    let end = this.datepipe.transform(event.value['end'], 'dd/MM/yyyy');
    // this.CommonDatefun(end, begin);
    // this.filterData = JSON.parse(localStorage.getItem("spendmoney_filter"));
    // this.loadData(this.filterData);
  }
  DateRange(a, b) {
  }
  Rowclick(val) {
    this.behaviorService.MainTimeEntryData(val);
    localStorage.setItem('edit_WORKITEMGUID', val.WORKITEMGUID);
  }

  CheckboxClick() {

  }

  saveCreateDiary() {

    console.log(this.selection.selected);
    
    let finalData = { DATA: this.selection.selected, FormAction: 'insert', VALIDATEONLY: false }
    this._mainAPiServiceService.getSetData(finalData, 'SetAppointment').subscribe(response => {
      console.log(response);

    }, err => {
      this.toastr.error(err);
    });




  }

  onPaginateChange(page: any) {

  }
  selectDayRange(val) {
    console.log(val);
  }

}
