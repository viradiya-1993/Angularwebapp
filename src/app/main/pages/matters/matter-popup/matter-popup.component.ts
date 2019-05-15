import { Component, OnInit, Inject } from '@angular/core';
import { MattersService, TimersService } from '../../../../_services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-matter-popup',
  templateUrl: './matter-popup.component.html',
  styleUrls: ['./matter-popup.component.scss']
})
export class MatterPopupComponent implements OnInit {
  Classdata: any[];
  active: any;
  isLoadingResults: boolean = false;
  action: any;
  dialogTitle: string;
  isspiner: boolean = false;
  FormAction: string;
  CommencementDate: string;
  classtype: any;

  constructor(
    private _mattersService: MattersService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MatterPopupComponent>,
    public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {
    this.action = _data.action;
    this.dialogTitle = this.action === 'edit' ? 'Edit Matter' : 'New Matter';
  }


  matterdetailForm: FormGroup;
  ngOnInit() {
    this.isLoadingResults = true;
    this.matterFormBuild();
    this._mattersService.getMattersClasstype({ 'LookupType': 'Matter Class' }).subscribe(responses => {
      if (responses.CODE === 200 && responses.STATUS === 'success') {
        this.Classdata = responses.DATA.LOOKUPS;
      }
      this.isLoadingResults = false;
    });
    this.matterdetailForm.controls['ACTIVE'].setValue(true);
    if (this.action === 'edit') {
      const localMatterID = JSON.parse(localStorage.getItem('set_active_matters'));
      // this.isLoadingResults = true;
      let postData = { 'MatterGuid': localMatterID.MATTERGUID };
      this._mattersService.getMattersDetail(postData).subscribe(response => {
        if (response.CODE === 200 && response.STATUS === 'success') {
          // let currentMatter = response.DATA.MATTERS[0];
          // this.active = currentMatter.ACTIVE === 0 ? false : true;
          // this.matterdetailForm.controls['MatterNum'].setValue(currentMatter.SHORTNAME);
          // this.matterdetailForm.controls['Client'].setValue(currentMatter.CONTACTTYPE);
          // this.matterdetailForm.controls['MatterDescription'].setValue(currentMatter.MATTER);
          // this.matterdetailForm.controls['ClientReference'].setValue(currentMatter.REFERENCE);
          // this.matterdetailForm.controls['PerHours'].setValue(currentMatter.RATEPERHOUR);
          // this.matterdetailForm.controls['PerDay'].setValue(currentMatter.RATEPERDAY);
          // this.isLoadingResults = false;
        }
      }, error => {
        this.toastr.error(error);
      });
    }

  }
  matterFormBuild() {
    this.matterdetailForm = this._formBuilder.group({
      MATTERCLASS: [''],
      ACTIVE: [''],
      SHORTNAME: [''],

      MatterDescription: [''],
      // general
      NOTES: [''],
      COMMENCEMENTDATE: [''],
      REFERENCE: [''],
      OTHERREFERENCE: [''],
      COMPLETEDDATE: [],
      PRIMARYFEEEARNERGUID: [''],
      OWNERGUID: [''],

      CostsAgreementDate: [],
      EstimateMinimum: [''],
      Ex_GST: [''],

      // client
      Clientmatter: [''],
      // rates
      Radiogroup1: [''],
      Checkbox: [''],
      Radiogroup2: [''],
      PerHours: [''],
      PerDay: [''],
      FixedPrice: [''],
      Ex_GSTs: [''],
      // Details
      // commercial
      ClassofShares: [''],
      NumberofShares: [''],
      Consideration: [''],
      // compensation
      AccidentDate: [''],
      NoticeofInjury: [''],
      ExpiryDate: [''],
      PlaceofInjury: [''],
      InjuryDesc: [''],
      CauseofInjury: [''],
      LitFunder: [''],
      TransferredClient: [''],
      ClientName: [''],
      EstAward: [''],
      ClaimNumber: [''],
      Investigation: [''],
      SettlementDate: [''],
      HearingDates: [''],
      // compulsory-acquisition
      Address: [''],
      ClientValuation: [''],
      AuthValuation: [''],
      // criminal
      BriefServiceDate: [''],
      CommittalDate: [''],
      ReplyDate: [''],
      Juvenile: [''],
      WaiverofCommital: [''],
      BailDate: [''],
      BailRestrictions: [''],
      Outcome: [''],
      SentencingDate: [''],
      Sentence: [''],
      S91Application: [''],
      S93Application: [''],
      CourtMatter: [''],
      Court: [''],
      Division: [''],
      List: [''],
      Registry: [''],

      // family
      CohabitationDate: [''],
      MarriageDate: [''],
      MarriagePlace: [''],
      MarriageCountry: [''],
      SeparationDate: [''],
      DateFiledForDivor: [''],
      DivorceDate: [''],
      DivorcePlace: [''],
      DivorceCountry: [''],
      NumDependants: [''],
      CliendId: [''],
      ExpiryDate1: [''],
      HearingDate: [''],

      // immigration
      VisaType: [''],
      Assets: [''],
      VisaStatus: [''],
      AnticipatedEntry: [''],
      LodgementDate: [''],
      VisaExpiryDate: [''],
      DecisionDueDate: [''],

      // leasing
      Address2: [''],
      DateExecuted: [''],
      LeaseReceived: [''],
      ValidUntil: [''],
      OptionDate: [''],
      Term: [''],
      DisclosureDate: [''],
      RegisteredNumber: [''],

      // litigation
      CourtMatter1: [''],
      Court1: [''],
      Division1: [''],
      List1: [''],
      Registry1: [''],
      ClientType1: [''],
      MatterTitleBelow: [''],
      CourtBelow1: [''],
      CaseBelow: [''],
      DateOfHearings: [''],
      MaterialDate: [''],
      DecisionOf: [''],
      CostEstimateSuccesful: [''],
      IncGST: [''],
      CostEstimateUnsuccesful: [''],
      IncGST2: [''],

      // maritime
      VesselName: [''],
      Flag: [''],
      VesselType: [''],
      Tonnage: [''],
      Master: [''],
      Location: [''],
      IncidentDate: [''],
      CourtMatter2: [''],
      ExchangeDate: [''],
      SettlementDate1: [''],

      // mortgage-finance
      PrincipalAdvanced: [''],
      InterestRate: [''],
      CommencementDate1: [''],
      ExpirtyDate: [''],
      DisachargeDate: [''],
      FolioIdentifier: [''],
      SecurityProperty: [''],

      // property-purchase
      Address3: [''],
      PurchasePrice: [''],
      ExchangeDate2: [''],
      Deposit: [''],
      StampDutyDue: [''],
      DepositBond: [''],
      SettlementDate2: [''],
      StampDuty: [''],
      DatePaid: [''],
      BankRef: [''],
      InitialDeposit: [''],
      BalanceDeposit1: [''],
      BalanceDeposit2: [''],
      BuildingReport: [''],
      PetReport: [''],
      SpecialConditions: [''],
      Status: [''],

      // property-sale 
      Address4: [''],
      PurchasePrice1: [''],
      ExchangeDate1: [''],
      SettlementDate3: [''],
      AdjustMentDate: [''],
      DatePaid1: [''],
      BankRef1: [''],
      Status1: [''],

      // strata
      StrataPlanNumber: [''],
      ExpirationDate: [''],
      LotNumber: [''],
      ByLowType: [''],
      ByLowNo: [''],
      ResolutionDate: [''],
      FolioIdentifier1: [''],
      AggrofEntitlement: [''],
      TotalUnits: [''],

      // trademark-ip
      ApplicationNumber: [''],

      // wills-estate
      DateofWill: [''],
      GrossValue: [''],
      NetValue: [''],
      NameOfTrust: [''],
      NameOfuperfund: [''],
      OfCodicils: [''],
      DateCodicil: [''],
      DateGrantRepresentation: [''],

      // others
      MATTERTYPE: [''],
      CLIENTSOURCE: [''],
      FIELDOFLAW: [''],
      INDUSTRY: [''],
      REFERRERGUID: [''],
      ARCHIVENO: [''],
      ARCHIVEDATE: ['']
    });
  }
  get f() {
    //console.log(this.contactForm);
    return this.matterdetailForm.controls;
  }
  Classtype(value) {
    this.classtype = value;
  }
  ondialogSaveClick(): void {
    this.FormAction = this.action !== 'edit' ? 'insert' : 'update';

    this.CommencementDate = this.f.CommencementDate.touched === false ? this.datepipe.transform(new Date(), 'dd/MM/yyyy') : localStorage.getItem('CommencementDate');

    this.isspiner = true;
    let details = {
      FormAction: this.FormAction,
      Client: this.f.Client.value,
      MatterNum: this.f.MatterNum.value,
      ACTIVE: this.f.ACTIVE.value,
      MatterDescription: this.f.MatterDescription.value,

      // general

      ClientReference: this.f.ClientReference.value,
      CommencementDate: this.CommencementDate,
      OtherRef: this.f.OtherRef.value,
      CostsAgreementDate: localStorage.getItem('CostsAgreementDate'),
      CompletedDate: localStorage.getItem('CompletedDate'),
      EstimateMinimum: this.f.EstimateMinimum.value,
      Ex_GST: this.f.Ex_GST.value,
      Notes: this.f.Notes.value,
      MatterOwner: this.f.MatterOwner.value,
      PrimaryFeeEarner: this.f.PrimaryFeeEarner.value,

      // client
      Clientmatter: this.f.Clientmatter.value,

      // rates
      Radiogroup1: this.f.Radiogroup1.value,
      Checkbox: this.f.Checkbox.value,
      Radiogroup2: this.f.Radiogroup2.value,
      PerHours: this.f.PerHours.value,
      PerDay: this.f.PerDay.value,
      FixedPrice: this.f.FixedPrice.value,
      Ex_GSTs: this.f.Ex_GSTs.value,


      // Details

      // others
      MatterType: this.f.MatterType.value,
      ClientSource: this.f.ClientSource.value,
      FiledOfLaw: this.f.FiledOfLaw.value,
      INDUSTRY: this.f.INDUSTRY.value,
      ArchiveNo: this.f.ArchiveNo.value,
      ArchiveDate: this.f.ArchiveDate.value,
      Referrer: this.f.Referrer.value,
    };
    console.log(details);
    return;
    this._mattersService.AddNewMatter(details).subscribe(response => {
      if (response.CODE === 200 && (response.STATUS === "OK" || response.STATUS === "success")) {
        if (this.action !== 'edit') {
          this.toastr.success('Matter save successfully');
        } else {
          this.toastr.success('Matter update successfully');
        }
        this.isspiner = false;
        this.dialogRef.close(true);
      } else {
        this.isspiner = false;
      }
    }, error => {
      this.toastr.error(error);
    });
    localStorage.removeItem('CostsAgreementDate');
    localStorage.removeItem('CommencementDate');
    localStorage.removeItem('CompletedDate');
  }
}
