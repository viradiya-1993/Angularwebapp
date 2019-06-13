import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TimersService } from 'app/_services';
import { round } from 'lodash';
import { MatDialog, MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import { UserSelectPopupComponent } from '../../user-select-popup/user-select-popup.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @Input() matterdetailForm: FormGroup;
  @Input() userType: any;
  PRICEVAL: any;
  PRICEVALGST: any;
  constructor(public datepipe: DatePipe, public MatDialog: MatDialog, private Timersservice: TimersService) {

  }

  CommencementDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['COMMENCEMENTDATE'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }

  CostsAgreementDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['FeeAgreementDate'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
  CompletedDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.matterdetailForm.controls['COMPLETEDDATE'].setValue(this.datepipe.transform(event.value, 'dd/MM/yyyy'));
  }
  ngOnInit() { }
  selectMatter() {
    const dialogRef = this.MatDialog.open(UserSelectPopupComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matterdetailForm.controls['OWNERGUID'].setValue(result.USERGUID);
        this.matterdetailForm.controls['OWNERGUIDTEXT'].setValue(result.FULLNAME);
      }
    });
  }
  get f() {
    return this.matterdetailForm.controls;
  }
  selectFeeEarner() {
    const dialogRef = this.MatDialog.open(UserSelectPopupComponent, { width: '100%', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matterdetailForm.controls['PRIMARYFEEEARNERGUID'].setValue(result.USERGUID);
        this.matterdetailForm.controls['PRIMARYFEEEARNERGUIDTEXT'].setValue(result.FULLNAME);
      }
    });
  }
  calcPE() {
    this.PRICEVALGST = round(this.f.EstimateFromTotalExGST.value * 1.1);
  }
  calcPI() {
    this.PRICEVAL = round(this.f.EstimateFromTotalIncGST.value / 1.1);
  }

}
