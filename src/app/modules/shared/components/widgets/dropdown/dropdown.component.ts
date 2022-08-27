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

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.loadDropdownOptions();
    if (this.field.changeEvent) {
      this.field.changeEvent.subscribe({
        next: (event: any) => {
          if (event.name === this.field.name) {
            this.loadDropdownOptions();
          }
        }
      });
    }
  }

  loadDropdownOptions() {
    this.initDropdownOptions(this.metdataStoreService.getDynamicFieldDropdownOptions(this.field.name));
  }

  initDropdownOptions(newOptions: any[]) {
    let optionsArray: DropdownOption[] = [];
    if (newOptions) {
      newOptions.forEach(opt => {
        let dropdownOpt = new DropdownOption();
        dropdownOpt.id = opt.id + '';
        dropdownOpt.name = opt.name + '';
        optionsArray.push(dropdownOpt);
      });
    }
    this.options = optionsArray;
  }

}
