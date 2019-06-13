import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from 'app/main/sorting-dialog/sorting-dialog.component';
import { ContactService, TableColumnsService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ContactComponent implements OnInit {
  highlightedRows: any;
  ColumnsObj = [];
  theme_type = localStorage.getItem('theme_type');
  selectedColore: string = this.theme_type == "theme-default" ? 'rebeccapurple' : '#43a047';
  contectTitle = this.theme_type == "theme-default" ? 'Solicitor' : 'Client';
  displayedColumns: string[];
  tempColobj: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  datanull: null;
  isLoadingResults: boolean = false;
  contactFilter: FormGroup;
  pageSize: any;
  selectedVal: any;
  constructor(
    private dialog: MatDialog,
    private TableColumnsService: TableColumnsService,
    private Contact: ContactService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder
  ) {
    this.contactFilter = this._formBuilder.group({
      Filter1: [''],
      Filter2: [''],
      ContactType: [''],
      search: [''],
    });
  }
  Contactdata;

  ngOnInit() {
    $('.example-containerdata').css('height', ($(window).height() - ($('#tool_baar_main').height() + $('.sticky_search_div').height() + 130)) + 'px');
    this.getTableFilter();
    let filterVals = JSON.parse(localStorage.getItem('contact_Filter'));
    console.log(filterVals);
    if (filterVals) {
      if (!filterVals.active) {
        this.contactFilter.controls['Filter1'].setValue('all');
      } else {
        this.contactFilter.controls['Filter1'].setValue(filterVals.active);
      }
      if (!filterVals.FirstLetter) {
        this.contactFilter.controls['Filter2'].setValue('-1');
      } else {
        this.contactFilter.controls['Filter2'].setValue(filterVals.FirstLetter);
      }
      this.selectedVal="all";
      filterVals.ContactType=" ";
      console.log(filterVals.ContactType);
      this.contactFilter.controls['ContactType'].setValue(filterVals.ContactType);
    } else {
      this.contactFilter.controls['Filter1'].setValue('1');
      this.contactFilter.controls['Filter2'].setValue('a');
      filterVals = { 'active': '1', 'FirstLetter': 'a', 'SEARCH': '', 'ContactType': '' };
      localStorage.setItem('contact_Filter', JSON.stringify(filterVals));
    }
    console.log(filterVals);
    this.LoadData(filterVals);
  }
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    localStorage.setItem('lastPageSize', event.pageSize);
  }
  getTableFilter() {
    this.TableColumnsService.getTableFilter('contacts', '').subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        let data = this.TableColumnsService.filtertableColum(response.DATA.COLUMNS, 'contactColumns');
        this.tempColobj = data.tempColobj;
        this.displayedColumns = data.showcol;
        this.ColumnsObj = data.colobj;
      }
    }, error => {
      this.toastr.error(error);
    });
  }
  get f() {
    return this.contactFilter.controls;
  }
  refreshContactTab() {
    this.LoadData(JSON.parse(localStorage.getItem('contact_Filter')));
  }
  LoadData(data) {
    this.isLoadingResults = true;
    this.Contact.ContactData(data).subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        this.Contactdata = new MatTableDataSource(response.DATA.CONTACTS);
        this.Contactdata.paginator = this.paginator;
        if (response.DATA.CONTACTS[0]) {
          localStorage.setItem('contactGuid', response.DATA.CONTACTS[0].CONTACTGUID);
          this.highlightedRows = response.DATA.CONTACTS[0].CONTACTGUID;
        }
        this.isLoadingResults = false;
      }
    }, err => {
      this.isLoadingResults = false;
      this.toastr.error(err);
    });
    this.pageSize = localStorage.getItem('lastPageSize');
  }


  //for edit popup
  editContact(val) {
    localStorage.setItem('contactGuid', val);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { 'data': this.ColumnsObj, 'type': 'contacts', 'list': '' };
    //open pop-up
    const dialogRef = this.dialog.open(SortingDialogComponent, dialogConfig);
    //Save button click
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempColobj = result.tempColobj;
        this.displayedColumns = result.columObj;
        this.ColumnsObj = result.columnameObj;
        if (!result.columObj) {
          this.Contactdata = new MatTableDataSource([]);
          this.Contactdata.paginator = this.paginator;
        } else {
          let filterVals = JSON.parse(localStorage.getItem('contact_Filter'));
          let filterVal = { 'active': filterVals.active, 'FirstLetter': filterVals.FirstLetter };
          this.LoadData(filterVal);
        }
      }
    });
  }
  //Filter:
  ContactChange(active) {
    if (active != 'all') {
      let filterVal: any = { 'active': active, 'FirstLetter': '' };
      if (!localStorage.getItem('contact_Filter')) {
        localStorage.setItem('contact_Filter', JSON.stringify(filterVal));
      } else {
        filterVal = JSON.parse(localStorage.getItem('contact_Filter'));
        filterVal.active = active;
        localStorage.setItem('contact_Filter', JSON.stringify(filterVal));
      }
      filterVal.SEARCH = this.f.search.value;
      this.LoadData(filterVal);
    } else {
      let filterVals: any = JSON.parse(localStorage.getItem('contact_Filter'));
      let filterVal = { 'active': '', 'FirstLetter': filterVals.FirstLetter };
      localStorage.setItem('contact_Filter', JSON.stringify(filterVal));
      filterVals.SEARCH = this.f.search.value;
      this.LoadData(filterVal);
    }
  }

  Contactvalue(FirstLetter) {
    if (FirstLetter != -1) {
      let filterVals: any = { 'active': '', 'FirstLetter': FirstLetter };
      if (!localStorage.getItem('contact_Filter')) {
        localStorage.setItem('contact_Filter', JSON.stringify(filterVals));
      } else {
        filterVals = JSON.parse(localStorage.getItem('contact_Filter'));
        filterVals.FirstLetter = FirstLetter;
        localStorage.setItem('contact_Filter', JSON.stringify(filterVals));
      }
      filterVals.SEARCH = this.f.search.value;
      this.LoadData(filterVals);
    } else {
      let filterVals: any = JSON.parse(localStorage.getItem('contact_Filter'));
      let filterVal = { 'active': filterVals.active, 'FirstLetter': '' };
      localStorage.setItem('contact_Filter', JSON.stringify(filterVal));
      filterVals.SEARCH = this.f.search.value;
      this.LoadData(filterVal);
    }
  }
  onSearch(searchFilter: any) {
   
    if (searchFilter['key'] === "Enter" || searchFilter == 'Enter') {
      let filterVal: any = JSON.parse(localStorage.getItem('contact_Filter'));
      console.log(filterVal);
      console.log(this.f.search.value);
      filterVal.SEARCH = this.f.search.value;
      console.log(filterVal);
      this.LoadData(filterVal);
    }
  }
  ContactTypeChange(value) {
  
    let filterVal: any = JSON.parse(localStorage.getItem('contact_Filter'));
    console.log(filterVal);
    if (!filterVal) {
      filterVal = { 'active': '', 'FirstLetter': '', 'SEARCH': this.f.search.value, 'ContactType': value  };
    } else {
      filterVal.ContactType = value;
      filterVal.SEARCH = this.f.search.value;
    }
    localStorage.setItem('contact_Filter', JSON.stringify(filterVal));
    this.LoadData(filterVal);
  }
}


