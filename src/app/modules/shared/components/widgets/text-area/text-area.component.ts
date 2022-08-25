import { Component, Input, OnInit } from '@angular/core';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input('field') field: DynamicFieldDto;

  constructor() { }

  ngOnInit() {

  }

}
