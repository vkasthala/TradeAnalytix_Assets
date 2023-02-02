import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-strategy-selection',
  templateUrl: './strategy-selection.component.html',
  styleUrls: ['./strategy-selection.component.scss']
})
export class StrategySelectionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StrategySelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
