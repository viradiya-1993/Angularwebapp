import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from 'app/main/sorting-dialog/sorting-dialog.component';
import { AuthoritiesService } from './../../../../_services';

@Component({
  selector: 'app-authorities',
  templateUrl: './authorities.component.html',
  styleUrls: ['./authorities.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthoritiesComponent implements OnInit {
  currentMatter: any = JSON.parse(localStorage.getItem('set_active_matters'));
  displayedColumns: string[] = ['MATTERAUTHORITYGUID', 'MATTERGUID', 'AUTHORITYGUID', 'AUTHORITY', 'CITATION', 'WEBADDRESS',
    'TOPIC', 'REFERENCE', 'COMMENT', 'SHORTNAME', 'CLIENTNAME'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoadingResults: boolean = false;

  constructor(private dialog: MatDialog, private authorities_service: AuthoritiesService) { }
  authorities_table;
  ngOnInit() {
    this.isLoadingResults = true;
    //get autorites
    let potData = { 'MatterGuid': this.currentMatter.MATTERGUID };
    this.authorities_service.getData(potData).subscribe(response => {
      localStorage.setItem('session_token', response.MatterAuthority.SessionToken);
      this.authorities_table = new MatTableDataSource<PeriodicElement>(response.MatterAuthority.DataSet);
      this.authorities_table.paginator = this.paginator;
      this.isLoadingResults = false;
    }, err => {
      console.log('Error occured');
    }
    );
  }
  //

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      'data': ['MATTERAUTHORITYGUID', 'MATTERGUID', 'AUTHORITYGUID', 'AUTHORITY', 'CITATION', 'WEBADDRESS',
        'TOPIC', 'REFERENCE', 'COMMENT', 'SHORTNAME', 'CLIENTNAME'], 'type': 'authorities'
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

//no need of this 
export interface PeriodicElement {
  topic: number;
  authority: string;
  citation: number;
  reference: string;
  web_address: string;
  comment: string;
}

