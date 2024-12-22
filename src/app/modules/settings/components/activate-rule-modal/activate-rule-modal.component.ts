import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-activate-rule-modal',
  templateUrl: './activate-rule-modal.component.html',
  styleUrls: ['./activate-rule-modal.component.scss']
})
export class ActivateRuleModalComponent implements OnInit {
  isMobileDevice: any;
  title: string;
  value: any;
  ruleType: any;
  btnText: string;
  jsonData:any;
  error: string

  constructor(
    public dialogRef: MatDialogRef<ActivateRuleModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.jsonData = data.res;
    this.btnText = data.btnText;
    if (data) {
      this.value = data.res.val;
      this.ruleType = data.res.ruleType;
    }
  }

  ngOnInit() {
    this.checkDevice();
  }

  closeModal() {
    this.dialogRef.close();
  }

  Activate() {
    if (this.jsonData.uiLabel === "A trading plan should be created everyday") {
      this.value = 1;
    } else if (this.value === null || this.value === undefined) {
      this.value = 0;
    }
    // this.event.emit({ data: form.value });
    this.dialogRef.close(this.value);
  }

  validateInput(value: any) {
    this.error = undefined;
    const dataType = this.jsonData.dataType;

    if (dataType === 'double' && value && isNaN(value)) {
      this.error = "Invalid input. Expected number";
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
