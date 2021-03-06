import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatterAddressPopupComponent } from '../matter-address-popup/matter-address-popup.component';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {

  constructor(public MatDialog: MatDialog, private datepipe: DatePipe) { }

  @Input() matterdetailForm: FormGroup;
  @Input() errorWarningData: any;
  ngOnInit() {
  }
  Matteraddress() {
    const dialogRef = this.MatDialog.open(MatterAddressPopupComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.matterdetailForm.controls['Clientmatter'].setValue(result.MATTERGUID);
        //this.matterdetailForm.controls['Clientmatter'].setValue(result.SHORTNAME + ' : ' + result.MATTER);
        // this.matterChange('MatterGuid', result.MATTERGUID);
      }
    });
  }
  DateExecutedClick(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['DATEEXECUTED'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
  ValidUntilClick(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['VALIDUNTIL'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
  OptionDateClick(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['OPTIONDATE'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
  DisclosureDateClick(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['DISCLOSUREDATE'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
}
