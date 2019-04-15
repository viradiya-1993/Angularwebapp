import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from 'app/main/sorting-dialog/sorting-dialog.component';
import { SafeCustodyService } from './../../../../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-safecustody',
  templateUrl: './safecustody.component.html',
  styleUrls: ['./safecustody.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SafecustodyComponent implements OnInit {
  currentMatter: any = JSON.parse(localStorage.getItem('set_active_matters'));
  displayedColumns: string[] = ['SAFECUSTODYGUID', 'SAFECUSTODYPACKETGUID', 'MATTERGUID', 'CONTACTGUID', 'DOCUMENTTYPE',
    'SAFECUSTODYDESCRIPTION', 'DOCUMENTNAME', 'STATUS', 'REMINDER', 'REMINDERDATE',
    'REMINDERTIME', 'AdditionalText', 'SHORTNAME', 'CONTACTNAME', 'PACKETNUMBER'];
  isLoadingResults: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private safeCustody_service: SafeCustodyService, private toastr: ToastrService) { }
  safeCustody_table;
  ngOnInit() {
    this.isLoadingResults = true;
    //get autorites  
    let potData = { 'MatterGUID': this.currentMatter.MATTERGUID };
    this.safeCustody_service.getData(potData).subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        this.safeCustody_table = new MatTableDataSource(response.DATA.SAFECUSTODIES);
        this.safeCustody_table.paginator = this.paginator;
      }
      this.isLoadingResults = false;
    }, error => {
      this.toastr.error(error);
    }
    );
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      'data': ['SAFECUSTODYGUID', 'SAFECUSTODYPACKETGUID', 'MATTERGUID', 'CONTACTGUID', 'DOCUMENTTYPE',
        'SAFECUSTODYDESCRIPTION', 'DOCUMENTNAME', 'STATUS', 'REMINDER', 'REMINDERDATE',
        'REMINDERTIME', 'AdditionalText', 'SHORTNAME', 'CONTACTNAME', 'PACKETNUMBER'], 'type': 'safecustody'
    };
    //open pop-up
    const dialogRef = this.dialog.open(SortingDialogComponent, dialogConfig);
    //Save button click
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        localStorage.setItem(dialogConfig.data.type, JSON.stringify(result));
      }
    });
    dialogRef.afterClosed().subscribe(data =>
      this.tableSetting(data)
    );
  }
  tableSetting(data: any) {
    if (data !== false) {
      this.displayedColumns = data;
    }
  }

}
export interface PeriodicElement {
  packet_number: number;
  packet_description: string;
  document: number;
  status: string;
  document_name: string;
  description: string;
  review_date: Date;
}




