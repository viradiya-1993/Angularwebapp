import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from '../../../_guards';

import { MatButtonModule, MatPaginatorModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatSlideToggleModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { LegalDetailsComponent } from './legal-details.component';
import { ChronologyComponent } from './chronology/chronology.component';
import { AuthoritiesComponent } from './authorities/authorities.component';
import { FileNotesComponent } from './file-notes/file-notes.component';
import { SafecustodyComponent } from './safecustody/safecustody.component';

const routes = [
  { path: '', redirectTo: '/legal-details/chronology', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: '', component: LegalDetailsComponent, children: [
      { path: 'chronology', component: ChronologyComponent },
      { path: 'authorities', component: AuthoritiesComponent },
      { path: 'file-notes', component: FileNotesComponent },
      { path: 'safe-custody', component: SafecustodyComponent }
    ], canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [LegalDetailsComponent, ChronologyComponent, AuthoritiesComponent, FileNotesComponent, SafecustodyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    //mat 
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  exports: [
    LegalDetailsComponent
  ]
})
export class LegalDetailsModule { }
