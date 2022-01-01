import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.scss']
})
export class SliderModalComponent implements OnInit {
  currentInd: number = 0;
  title: string;

  constructor(public dialogRef: MatDialogRef<SliderModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  priviousSlide() {
    this.currentInd--;
  }
  nextSlide() {
    if (this.currentInd === (this.data.length - 1)) {
      this.currentInd = 0;
    } else {
      this.currentInd++;
    }
  }

}
