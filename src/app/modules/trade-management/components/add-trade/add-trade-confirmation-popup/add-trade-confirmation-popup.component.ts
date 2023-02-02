import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-trade-confirmation-popup',
  templateUrl: './add-trade-confirmation-popup.component.html',
  styleUrls: ['./add-trade-confirmation-popup.component.scss']
})
export class AddTradeConfirmationPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddTradeConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

}
