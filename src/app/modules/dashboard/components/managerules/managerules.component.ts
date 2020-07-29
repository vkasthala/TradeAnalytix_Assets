import { Component, OnInit } from '@angular/core';
import { ManageRulePopupComponent } from '../../modalAsComponents/manage-rule-popup/manage-rule-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-managerules',
  templateUrl: './managerules.component.html',
  styleUrls: ['./managerules.component.scss']
})
export class ManagerulesComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }

  addRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

}
