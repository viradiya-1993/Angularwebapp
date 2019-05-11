import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactSelectDialogComponent } from '../../../contact/contact-select-dialog/contact-select-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  ELEMENT_DATA = [];
  name: string;
  position: number;
  weight: number;
  symbol: string;
  

  constructor(
    public MatDialog: MatDialog,
  ) { }
  @Input() matterdetailForm: FormGroup;


  ngOnInit() {

  }

  addElement() {
    this.ELEMENT_DATA.push({position: 1, name: 'Client', weight: 1.0079, symbol: 'H'});
  }
  RemoveElement(){
    
  }
  public ContactMatter() {
    const dialogRef = this.MatDialog.open(ContactSelectDialogComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
    //  console.log(result);
      if (result) {
        // this.matterdetailForm.controls['Clientmatter'].setValue(result.MATTERGUID);
         this.matterdetailForm.controls['Clientmatter'].setValue(result.SHORTNAME + ' : ' + result.MATTER);
        // this.matterChange('MatterGuid', result.MATTERGUID);
      }
    });
  }
  
}
