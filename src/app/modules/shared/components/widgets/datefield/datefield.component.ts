import { Component, Input, OnInit } from '@angular/core';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';

@Component({
  selector: 'app-datefield',
  templateUrl: './datefield.component.html',
  styleUrls: ['./datefield.component.scss']
})
export class DatefieldComponent implements OnInit {
  
  @Input('field') field: DynamicFieldDto;

  constructor() { }

  ngOnInit() {

  }

}
