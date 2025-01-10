import { Component, OnInit, Inject, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-rule-popup',
  templateUrl: './manage-rule-popup.component.html',
  styleUrls: ['./manage-rule-popup.component.scss']
})
export class ManageRulePopupComponent implements OnInit {
  title:string;
  btnText:string;
  rowData:any;
  entryexitruleform;
  isDemoMode:boolean;
  public event: EventEmitter<any> = new EventEmitter();
  isMobileDevice: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ManageRulePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.btnText = data.btnText;
    this.rowData = data.formData;
    this.isDemoMode = data.isDemoMode;
    this.entryexitruleform = this.formBuilder.group({
      type: "",
      description:"",
      source:""
      })
  }

  ngOnInit() {
    this.checkDevice();
  }

  closeModal(form) {
    this.dialogRef.close();
    if (form && form !== undefined) {
      this.event.emit({ data: form.value });
      this.dialogRef.close(form.value);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkDevice()
  }

  checkDevice() {
    setTimeout(() => {
      const agent = window.navigator.userAgent.toLowerCase();
      let regexp = /android|iphone|kindle|ipad/i;
      let deviceType = regexp.test(agent);
      if (deviceType) {
        this.isMobileDevice = true;
      } else {
        this.isMobileDevice = false;
      }
    }, 100)
  }

}
