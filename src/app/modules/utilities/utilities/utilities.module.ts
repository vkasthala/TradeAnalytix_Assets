import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule, MatStepperNext } from '@angular/material/stepper';
import { MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule
  ],
  exports : [
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FooterComponent,
    MatExpansionModule,
    MatIconModule
  ]
})
export class UtilitiesModule { }
