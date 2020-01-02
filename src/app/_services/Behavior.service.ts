import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  public matterInvoice$: BehaviorSubject<any> = new BehaviorSubject(null);
  public workInProgress$: BehaviorSubject<any> = new BehaviorSubject(null);
  public userPermission$: BehaviorSubject<any> = new BehaviorSubject(null);
  public calanderViewType$: BehaviorSubject<any> = new BehaviorSubject('month');
  public TimeScale$: BehaviorSubject<any> = new BehaviorSubject(1);
  //for packs
  public packs$: BehaviorSubject<any> = new BehaviorSubject(null);
  public EmailGenerateData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public TemplateGenerateData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public DocumentRegisterData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public SpendMoneyData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public ChartAccountData$: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('ChartAccountData')));
  public ChartAccountDataEdit$: BehaviorSubject<any> = new BehaviorSubject(null);

  public MatterData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public TaskData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public SysytemAccountData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public SysytemAccountDIalogData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public UserDropDownData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public FileNotesData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public ActiveSubMenu$: BehaviorSubject<any> = new BehaviorSubject(null);
  public ConflictMainData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public ConflictDataList$: BehaviorSubject<any> = new BehaviorSubject(null);
  public LegalChronologyData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public MainTimeEntryData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public matterClassData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public MainAuthorityData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public LegalAuthorityData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public LegalAuthorityToolbar$: BehaviorSubject<any> = new BehaviorSubject(null);
  public LegalAuthorityForSubAuthToolbar$: BehaviorSubject<any> = new BehaviorSubject(null);
  public MainTopicData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public RecouncileItemSendSetData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public MatterEditData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public estimatelegalData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public ActivityData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public BankChartAccountStore$: BehaviorSubject<any> = new BehaviorSubject(null);
  public GeneralData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public SafeCustody$: BehaviorSubject<any> = new BehaviorSubject(null);
  public forDiaryRefersh$: BehaviorSubject<any> = new BehaviorSubject(null);
  public forDiaryRefersh2$: BehaviorSubject<any> = new BehaviorSubject(null);
  public ReceiptData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public Packets$: BehaviorSubject<any> = new BehaviorSubject(null);
  public dialogClose$: BehaviorSubject<any> = new BehaviorSubject(null);
  public UseCalanderViewType$: BehaviorSubject<any> = new BehaviorSubject(null);

  public TrustDuplicateModuleHandling$: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('ChartURL')));

  public MatterNum$: BehaviorSubject<any> = new BehaviorSubject(null);
  public contactData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public activitiesData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public totalDashboard$: BehaviorSubject<any> = new BehaviorSubject(null);

  public CommonToolbarHS$: BehaviorSubject<any> = new BehaviorSubject(null);

  public UserData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public DiaryData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public DelGloballypopupHS$: BehaviorSubject<any> = new BehaviorSubject(null);
  public RecouncileConstName$: BehaviorSubject<any> = new BehaviorSubject(null);

  public loadingSystemSetting$: BehaviorSubject<any> = new BehaviorSubject(null);
  public loadingAccountMNG$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  matterInvoiceData(matterInvoice: any) {
    this.matterInvoice$.next(matterInvoice);
  }
  loadingSystemSetting(loadingSystemSetting: any) {
    this.loadingSystemSetting$.next(loadingSystemSetting);
  }
  loadingAccountMNG(loadingAccountMNG: any) {
    this.loadingAccountMNG$.next(loadingAccountMNG);
  }
  activitiesData(activitiesData: any) {
    this.activitiesData$.next(activitiesData);
  }
  DiaryData(DiaryData: any) {
    this.DiaryData$.next(DiaryData);
  }
  UserData(UserData: any) {
    this.UserData$.next(UserData);
  }
  contactData(contactData: any) {
    this.contactData$.next(contactData);
  }
  CommonToolbarHS(CommonToolbarHS: any) {
    this.CommonToolbarHS$.next(CommonToolbarHS);
  }
  totalDashboard(totalDashboard: any) {
    this.totalDashboard$.next(totalDashboard);
  }
  TrustDuplicateModuleHandling(TrustDuplicateModuleHandling: any) {
    this.TrustDuplicateModuleHandling$.next(TrustDuplicateModuleHandling);
  }
  MatterNum(MatterNum: any) {
    this.MatterNum$.next(MatterNum);
  }
  dialogClose(dialogClose: any) {
    this.dialogClose$.next(dialogClose);
  }
  ReceiptData(ReceiptData: any) {
    this.ReceiptData$.next(ReceiptData);
  }
  forDiaryRefersh2(forDiaryRefersh2: any) {
    this.forDiaryRefersh2$.next(forDiaryRefersh2);
  }
  forDiaryRefersh(forDiaryRefersh: any) {
    this.forDiaryRefersh$.next(forDiaryRefersh);
  }
  BankChartAccountStore(BankChartAccountStore: any) {
    this.BankChartAccountStore$.next(BankChartAccountStore);
  }
  RecouncileItemSendSetData(RecouncileItemSendSetData: any) {
    this.RecouncileItemSendSetData$.next(RecouncileItemSendSetData);
  }
  LegalAuthorityToolbar(LegalAuthorityToolbar: any) {
    this.LegalAuthorityToolbar$.next(LegalAuthorityToolbar);
  }
  LegalAuthorityForSubAuthToolbar(LegalAuthorityForSubAuthToolbar: any) {
    this.LegalAuthorityForSubAuthToolbar$.next(LegalAuthorityForSubAuthToolbar);
  }
  LegalAuthorityData(LegalAuthorityData: any) {
    this.LegalAuthorityData$.next(LegalAuthorityData);
  }
  MainTopicData(MainTopicData: any) {
    this.MainTopicData$.next(MainTopicData);
  }



  matterClassData(matterClassData: any) {
    this.matterClassData$.next(matterClassData);
  }
  
  MainAuthorityData(MainAuthorityData: any) {
    this.MainAuthorityData$.next(MainAuthorityData);
  }
  MainTimeEntryData(MainTimeEntryData: any) {
    this.MainTimeEntryData$.next(MainTimeEntryData);
  }
  ConflictDataList(ConflictDataList: any) {
    this.ConflictDataList$.next(ConflictDataList);
  }
  LegalChronologyData(LegalChronologyData: any) {
    this.LegalChronologyData$.next(LegalChronologyData);
  }
  ConflictMainData(ConflictMainData: any) {
    this.ConflictMainData$.next(ConflictMainData);
  }
  SetActiveSubMenu(activeSubMenu: any) {
    this.ActiveSubMenu$.next(activeSubMenu);
  }
  FileNotesData(FileNotesData: any) {
    this.FileNotesData$.next(FileNotesData);
  }
  UserDropDownData(UserDropDownData: any) {
    this.UserDropDownData$.next(UserDropDownData);
  }
  SysytemAccountData(SysytemAccountData: any) {
    this.SysytemAccountData$.next(SysytemAccountData);
  }
  SysytemAccountDIalogData(SysytemAccountDIalogData: any) {
    this.SysytemAccountDIalogData$.next(SysytemAccountDIalogData);
  }

  setworkInProgressData(workInProgressData: any) {
    this.workInProgress$.next(workInProgressData);
  }

  packsitems(d) {
    this.packs$.next(d);
  }
  EmailGenerateData(d) {
    this.EmailGenerateData$.next(d);
  }

  TemplateGenerateData(d) {
    this.TemplateGenerateData$.next(d);
  }

  DocumentRegisterData(d) {
    this.DocumentRegisterData$.next(d);
  }
  SpendMoneyData(d) {
    this.SpendMoneyData$.next(d);
  }
  ChartAccountData(d) {
    this.ChartAccountData$.next(d);
  }
  setChartAccountDataEdit(d) {
    this.ChartAccountDataEdit$.next(d);
  }
  MatterData(d) {
    this.MatterData$.next(d);
  }
  TaskData(d) {
    this.TaskData$.next(d);
  }
  setCalanderViewType(d) {
    this.calanderViewType$.next(d);
  }
  UseCalanderViewType(d) {
    this.UseCalanderViewType$.next(d);
  }
  setTimeScale(d) {
    this.TimeScale$.next(d);
  }
  setMatterEditData(d) {
    this.MatterEditData$.next(d);
  }
  estimatelegalData(estimatelegalData: any) {
    this.estimatelegalData$.next(estimatelegalData);
  }
  ActivityData(ActivityData: any) {
    this.ActivityData$.next(ActivityData);
  }
  setGeneralData(GeneralData: any) {
    this.GeneralData$.next(GeneralData);
  }
  SafeCustody(SafeCustody: any) {
    this.SafeCustody$.next(SafeCustody);
  }
  Packets(Packets: any) {
    this.Packets$.next(Packets);
  }
  RecouncileConstName(RecouncileConstName: any) {
    this.RecouncileConstName$.next(RecouncileConstName);
  }
  resizeTableForAllView() {
    $('.example-containerdata').css('height', ($(window).height() - ($('#tool_baar_main').height() + $('.sticky_search_div').height() + 130)) + 'px');
  }
  resizeTableForAllViewForSub() {
    $('.example-containerdata').css('height', ($(window).height() - ($('#tool_baar_main').height() + $('.sticky_search_div').height() + 250)) + 'px');
  }
  DelGloballypopupHS(DelGloballypopupHS: any) {
    this.DelGloballypopupHS$.next(DelGloballypopupHS);
  }

}