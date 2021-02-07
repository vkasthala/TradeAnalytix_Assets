import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ManageRulePopupComponent } from '../../../settings/components/managerules/manage-rule-popup/manage-rule-popup.component';


@Component({
  selector: 'app-addnewtradeplan',
  templateUrl: './addnewtradeplan.component.html',
  styleUrls: ['./addnewtradeplan.component.scss']
})
export class AddnewtradeplanComponent implements OnInit {
  protected add = true;
  protected edit = false;

  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  
  constructor(
    private _dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
  }
  addRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        formData:''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  addEntry() { 
    
    this.router.navigate(['/dashboard/trade-plans']) 
  }

  previous() { this.router.navigate(['/dashboard/trade-plans']) }


  goForward() {
      this.tradeMobileStepper.next();
  }
  

}
