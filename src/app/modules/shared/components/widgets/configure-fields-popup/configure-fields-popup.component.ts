import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';
import { DynamicFieldUpdateDto } from 'src/app/modules/settings/models/dynamic-field-update-dto.model';
import { DynamicFieldsService } from 'src/app/modules/settings/services/dynamic-fields.service';

@Component({
  selector: 'app-configure-fields-popup',
  templateUrl: './configure-fields-popup.component.html',
  styleUrls: ['./configure-fields-popup.component.scss']
})
export class ConfigureFieldsPopupComponent implements OnInit {

  dynamicFields: DynamicFieldDto[] = [];
  category: string;
  title: string;

  constructor(public dialogRef: MatDialogRef<ConfigureFieldsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dynamicFieldsService: DynamicFieldsService) {
    this.category = data.category;
    this.title = data.title;
  }

  ngOnInit() {
    this.loadDynamicFields();
  }

  loadDynamicFields() {
    this.dynamicFieldsService.getUserDynamicFields(this.category).subscribe(result => {
      this.dynamicFields = result;
      this.dynamicFields.forEach(field => {
        if (field.userFieldId && field.userFieldId > 0) {
          field.show = "1";
        } else {
          field.show = "0";
        }
      });
    });
  }

  saveFieldSettings() {
    let updateDtos: DynamicFieldUpdateDto[] = [];
    this.dynamicFields.forEach(field => {
      let updateDto: DynamicFieldUpdateDto = new DynamicFieldUpdateDto();
      updateDto.fieldId = field.id;
      updateDto.status = ("1" === field.show ? true : false);
      updateDtos.push(updateDto);
    });
    if (updateDtos.length > 0) {
      this.dynamicFieldsService.updateFieldStatus(updateDtos).subscribe(result => {
        console.log('Fields status updated successfully');
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
