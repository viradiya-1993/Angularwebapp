import { Component, OnInit, Input, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';
import { MainAPiServiceService } from 'app/_services';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-trust-money.dialoge',
  templateUrl: './trust-money-dialoge.component.html',
  styleUrls: ['./trust-money-dialoge.component.scss'],
  animations: fuseAnimations
})
export class TrustMoneyDialogeComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isLoadingResults: boolean = false;
  TrustMoneyData = {
    "PaymentType": "Cheque", "CheckBox": false
  }
  addData: any = [];
  PymentType: string = "Cheque";
  matterType: boolean = false;
  action: any;
  title: string;
  ForDetailTab: string;
  constructor(private _mainAPiServiceService: MainAPiServiceService,
    @Inject(MAT_DIALOG_DATA) public _data: any, ) {
    this.action = _data.action;
    if (this.action == "receipt") {
      this.title = "Add Trust Receipt"
    } else if (this.action == "withdrawal") {
      this.title = "Add Trust withdrawal";
    } else if (this.action == "Transfer") {
      this.title = "Add Trust Transfer";
      this.TrustMoneyData.PaymentType = "Transfer";
      this.PymentType = "Transfer";

    } else if (this.action == "office") {
      this.title = "Add Trust Office";
      this.matterType = true;
      this.TrustMoneyData.CheckBox = true;
      // this.PymentType="Office";
    } else if (this.action == "money receipt") {
      this.title = "Add Controlled Money Receipt";

    } else if (this.action == "money withdrawal") {
      this.title = "Add Controlled Money withdrawal";
    }

    else if (this.action == "Cancelled Cheque") {
      this.title = "Add Cancelled Cheque";
    }else if (this.action == "Unknown Deposit") {
      this.title = "Add Unknown Deposit Receipt";
    }
    else if (this.action == "Transfer Unknow Deposit") {
      this.title = "Add Unknown Deposit Transfer";
      this.action = "Transfer";
      this.TrustMoneyData.PaymentType = "Transfer";
      this.PymentType = "Transfer";
    }else if (this.action == "Statutory Deposit") {
      this.title = "Add Statutory Depositl";
      this.ForDetailTab='Statutory Deposit';
      this.action = "withdrawal";
    }else if (this.action == "Statutory Receipt") {
      this.title = "Add Statutory Receipt";
      this.ForDetailTab='Statutory Receipt';
      this.action = "receipt";


    }else if (this.action == "Release Trust") {
      this.title = "Add Release Trust";
    }
  }

  ngOnInit() {
    // this._mainAPiServiceService.getSetData({}, 'GetSystem').subscribe(response=>{
    //  // console.log(response);
    //   this.addData=response.DATA.SYSTEM.ADDRESSGROUP.POSTALADDRESSGROUP
    // })

  }
  PaymentTypeChange(val) {
    if (val == "Cheque") {
      this.PymentType = "Cheque";
    } else if (val == "EFT") {
      this.PymentType = "EFT";
    } else if (val == "Cash") {
      this.PymentType = "Cash";
    }
  }
  CheckBoxClick(val) {
    this.matterType = val
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
