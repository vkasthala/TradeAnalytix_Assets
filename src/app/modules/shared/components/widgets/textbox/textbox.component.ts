import { Component, Input, OnInit } from '@angular/core';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  @Input('field') field: DynamicFieldDto;

  //@Input('placeholder') placeholder: string;

  value: string;

  constructor() { }

  ngOnInit() {
 
  }

}
