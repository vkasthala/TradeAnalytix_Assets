import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-journal-popup',
  templateUrl: './journal-popup.component.html',
  styleUrls: ['./journal-popup.component.scss']
})
export class JournalPopupComponent implements OnInit {

  category: string;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<JournalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
    this.category = data.category;
    this.title = data.title;
  }

  ngOnInit() {
    
  }

  

  closeModal() {
    this.dialogRef.close();
  }

}
