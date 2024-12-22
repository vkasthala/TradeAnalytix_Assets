import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-disable-rule-modal',
  templateUrl: './disable-rule-modal.component.html',
  styleUrls: ['./disable-rule-modal.component.scss']
})
export class DisableeRuleModalComponent implements OnInit {
  isMobileDevice: any;
  title: string;
  value: any;

  jsonData:any;

  constructor(
    public dialogRef: MatDialogRef<DisableeRuleModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.jsonData = data;
    if (data) {
      this.value = data.val;
    }
  }

  ngOnInit() {
    this.checkDevice();
  }

  closeModal() {
    this.dialogRef.close();
  }

  Disable() {
    this.dialogRef.close();
    // this.event.emit({ data: form.value });
    this.dialogRef.close(this.value);
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
