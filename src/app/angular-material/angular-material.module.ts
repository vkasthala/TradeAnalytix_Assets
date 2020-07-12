import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [MatAutocompleteModule,MatInputModule],
  exports: [MatAutocompleteModule,MatInputModule]
})
export class AngularMaterialModule { }
