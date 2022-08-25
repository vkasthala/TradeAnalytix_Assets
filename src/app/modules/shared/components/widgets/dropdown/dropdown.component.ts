import { Component, Input, OnInit } from '@angular/core';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';
import { DropdownOption } from '../../../models/dropdown-option.model';
import { UserMetadataStoreService } from '../../../services/user-metadata-store.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input('field') field: DynamicFieldDto;

  options: DropdownOption[];

  constructor(public metdataStoreService: UserMetadataStoreService) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initDropdownOptions(this.metdataStoreService.getDynamicFieldDropdownOptions(this.field.name));
  }

  initDropdownOptions(options: any[]) {
    let optionsArray: DropdownOption[] = [];
    if (options) {
      options.forEach(option => {
        let dropdownOpt = new DropdownOption();
        dropdownOpt.id = option.id + '';
        dropdownOpt.name = option.name + '';
        optionsArray.push(dropdownOpt);
      });
    }
    this.options = options;
  }

}
