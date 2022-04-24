import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-followers',
  templateUrl: './view-followers.component.html',
  styleUrls: ['./view-followers.component.scss']
})
export class ViewFollowersComponent implements OnInit {
  // reviewToggle: boolean = true;
  title: string;

  constructor(public dialogRef: MatDialogRef<ViewFollowersComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
