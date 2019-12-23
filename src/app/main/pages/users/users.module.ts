import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../_guards';
import { RouterModule } from '@angular/router';


import { UsersComponent } from './users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';


import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { UserBudgetDialogComponent } from './user-dialog/user-budget-dialog/user-budget-dialog.component';

import { BehaviorService } from 'app/_services';
import { ApplicationPipesModule } from '../application-pipes.module';



const routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

];
@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserBudgetDialogComponent
  ],
  entryComponents: [
    UsersComponent,
    UserDialogComponent,
    UserBudgetDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    // MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    SatDatepickerModule, SatNativeDateModule,

    MaterialTimePickerModule,
    MatCheckboxModule,
    DragDropModule,
    MatExpansionModule,
    MatRadioModule,
    // N level tree checkbox
    MatTreeModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule,
    ScrollDispatchModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSortModule,
    ApplicationPipesModule

  ],
  providers: [BehaviorService],
  exports: [
    UsersComponent,
    MatTreeModule,
    CdkTableModule,
    CdkTreeModule,
    ScrollDispatchModule,
    MatDatepickerModule
  ],
  bootstrap: [],
})
export class UsersModule { }
