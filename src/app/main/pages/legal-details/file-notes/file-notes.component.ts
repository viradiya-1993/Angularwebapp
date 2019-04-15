import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from 'app/main/sorting-dialog/sorting-dialog.component';
import { FileNotesService } from './../../../../_services';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-file-notes',
  templateUrl: './file-notes.component.html',
  styleUrls: ['./file-notes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FileNotesComponent implements OnInit {
  currentMatter: any = JSON.parse(localStorage.getItem('set_active_matters'));
  displayedColumns: string[] = ['FILENOTEGUID', 'MATTERGUID', 'USERNAME', 'Date', 'Time', 'Note', 'SHORTNAME', 'CONTACTNAME'];
  isLoadingResults: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private fileNotes_service: FileNotesService, private toastr: ToastrService) { }
  filenotes_table;
  ngOnInit() {
    this.isLoadingResults = true;
    //get autorites
    let potData = { 'MatterGUID': this.currentMatter.MATTERGUID };
    this.fileNotes_service.getData(potData).subscribe(response => {
      if (response.CODE == 200 && response.STATUS == "success") {
        let FILENOTES = response.DATA.FILENOTES == null ? [] : response.DATA.FILENOTES;
        this.filenotes_table = new MatTableDataSource(FILENOTES);
        this.filenotes_table.paginator = this.paginator;
      }
      this.isLoadingResults = false;
    }, error => {
      this.toastr.error(error);
    });
    this.isLoadingResults = false;
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { 'data': ['FILENOTEGUID', 'MATTERGUID', 'USERNAME', 'Date', 'Time', 'Note', 'SHORTNAME', 'CONTACTNAME'], 'type': 'file-notes' };
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
  date: Date;
  time: number;
  note: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  { date: new Date('2/1/2014'), time: 11.30, note: 'work in progress ' },
  { date: new Date('2/12/2014'), time: 15.30, note: 'work in progress ' },
  { date: new Date('6/13/2014'), time: 15.30, note: 'work in progress ' },
  { date: new Date('5/13/2014'), time: 14.56, note: ' work in progress' },
  { date: new Date('1/13/2014'), time: 13.30, note: ' work in progress' },
  { date: new Date('1/11/2014'), time: 23.30, note: 'work in progress ' },

];

