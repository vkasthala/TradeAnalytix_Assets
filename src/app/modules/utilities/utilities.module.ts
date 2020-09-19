import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule, MatStepperNext } from '@angular/material/stepper';
import { MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FooterComponent } from '../shared/components/footer/footer.component';
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
    MatIconModule,
    MyDateRangePickerModule 
  ],
  exports : [
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FooterComponent,
    MatExpansionModule,
    MatIconModule,
    MyDateRangePickerModule 
  ]
})
export class UtilitiesModule { }
