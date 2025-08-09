import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TermsAgreementModalComponent } from './terms-agreement-modal/terms-agreement-modal.component';

@NgModule({
  declarations: [
    TermsAgreementModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    TermsAgreementModalComponent
  ]
})
export class SupportModule { }