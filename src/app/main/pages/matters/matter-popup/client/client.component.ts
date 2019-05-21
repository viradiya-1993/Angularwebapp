import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactSelectDialogComponent } from '../../../contact/contact-select-dialog/contact-select-dialog.component';
import { FormGroup } from '@angular/forms';
import { CorrespondDailogComponent } from '../../correspond-dailog/correspond-dailog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  Correspond = [];
  name: string;
  position: number;
  weight: number;
  symbol: string;
  isspiner: boolean;


  constructor(public MatDialog: MatDialog, ) { }
  @Input() matterdetailForm: FormGroup;

  ngOnInit() { }
  Addcorres_party() {
    const dialogRef = this.MatDialog.open(CorrespondDailogComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Correspond.push(result);
      }
    });
  }
  ContactMatter() {
    const dialogRef = this.MatDialog.open(ContactSelectDialogComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matterdetailForm.controls['FirmGuid'].setValue(result.CONTACTGUID);
        this.matterdetailForm.controls['Clientmattertext'].setValue(result.CONTACTNAME + ' - ' + result.SUBURB);
      }
    });
  }
  editElement() {
    alert('editElement');
  }
  deleteElement() {
    alert('deleteElement');
  }

}
