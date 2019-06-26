import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SystemSettingModule } from './system-settings/system-setting.module';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { MattersModule } from './matters/matters.module';
import { TimeEntriesModule } from './time-entries/time-entries.module';
import { DiaryModule } from './diary/diary.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SpendMoneyModule } from './spend-money/spend-money.module';
import { ReceiveMoneyModule } from './receive-money/receive-money.module';
import { TemplateModule } from './template/template.module';
import { SystemSettingTemplateModule } from './system-settings/templates/templates.module';
// import { NumericDirective } from './time-entries/time-entry-dialog/numericValidation.component';
import { ActivitiesModule } from './activities/activities.module';
import { SortingDialogModule } from '../sorting-dialog/sorting-dialog.module';
import { NewfilenoteModule } from './newfilenote/newfilenote.module';
import { DocumentRegitser } from './document-register/document-register.module';





const appRoutes: Routes = [
  { path: 'matters', loadChildren: './matters/matters.module#MattersModule' },
  { path: 'time-billing', loadChildren: './time-billing/time-billing.module#TimeBillingModule' },
  { path: 'legal-details', loadChildren: './legal-details/legal-details.module#LegalDetailsModule' },
  { path: 'time-entries', loadChildren: './time-entries/time-entries.module#TimeEntriesModule' },
  { path: 'invoice', loadChildren: './invoice/invoice.module#InvoiceModule' },
  { path: 'spend-money', loadChildren: './spend-money/spend-money.module#SpendMoneyModule' },
  { path: 'receive-money', loadChildren: './receive-money/receive-money.module#ReceiveMoneyModule' },
  { path: 'create-document', loadChildren: './template/template.module#TemplateModule' },
  { path: 'diary', loadChildren: './diary/diary.module#DiaryModule' },
  { path: 'document-register', loadChildren: './document-register/document-register.module#DocumentRegitser' },

  //added by web 19
  //  { path: ' ', loadChildren: './system-setting/system-settings.module#SystemSettingModule' },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    ContactModule,
    SystemSettingModule,
    UsersModule,
    MattersModule,
    TimeEntriesModule,
    DiaryModule,
    InvoiceModule,
    SpendMoneyModule,
    ReceiveMoneyModule,
    TemplateModule,
    SystemSettingTemplateModule,
    ActivitiesModule,
    SortingDialogModule,
    NewfilenoteModule,
    DocumentRegitser

  ]
})
export class PagesModule { }  
