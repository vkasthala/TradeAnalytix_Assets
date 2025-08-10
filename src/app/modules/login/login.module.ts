import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { JoinWaitlistComponent } from './components/join-waitlist/join-waitlist.component';

@NgModule({
  declarations: [
    JoinWaitlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class LoginModule { }