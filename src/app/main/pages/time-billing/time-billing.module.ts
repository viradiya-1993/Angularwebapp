import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from '../../../_guards';

import { MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { TimeBillingComponent } from './time-billing.component';
import { EstimateComponent } from './estimate/estimate.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { MatterInvoicesComponent } from './matter-invoices/matter-invoices.component';
import { ReceiptsCreditsComponent } from './receipts-credits/receipts-credits.component';
import { MatterTrustComponent } from './matter-trust/matter-trust.component';
//import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import {MatSortModule} from '@angular/material/sort';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker'
import { AppDateAdapter, APP_DATE_FORMATS } from 'app/date.adapter';

const routes = [
  { path: '', redirectTo: '/time-billing/estimate', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: '', component: TimeBillingComponent, children: [
      { path: 'estimate', component: EstimateComponent },
      {
        path: 'work-in-progress', component: WorkInProgressComponent, children: [
          { path: '', component: EstimateComponent },
          { path: 'invoice', component: EstimateComponent },
        ]
      },
      { path: 'matter-invoices', component: MatterInvoicesComponent },
      { path: 'receipts-credits', component: ReceiptsCreditsComponent },
      { path: 'matter-trust', component: MatterTrustComponent },
    ], canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [TimeBillingComponent, EstimateComponent, WorkInProgressComponent, MatterInvoicesComponent, ReceiptsCreditsComponent, MatterTrustComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,

    //mat 
    SatDatepickerModule, SatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule, MatProgressSpinnerModule,
    MatInputModule,
    MatMenuModule,
    // MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    TimeBillingComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
})
export class TimeBillingModule { }
