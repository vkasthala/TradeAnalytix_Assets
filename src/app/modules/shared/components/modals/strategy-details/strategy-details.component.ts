import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-strategy-details-modal',
  templateUrl: './strategy-details.component.html',
  styleUrls: ['./strategy-details.component.scss']
})
export class StrategyDetailsComponent implements OnInit {  

  constructor(
    public dialogRef: MatDialogRef<StrategyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    
  }

  ngOnInit() {

  }

  closeModal() {
    this.dialogRef.close();
  }
   

}
