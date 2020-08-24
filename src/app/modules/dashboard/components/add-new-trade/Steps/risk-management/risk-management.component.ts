import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SingleInputModalComponent } from 'src/app/modules/dashboard/modalAsComponents/single-input-modal/single-input-modal.component';

@Component({
  selector: 'app-risk-management',
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent implements OnInit {

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }

  previous() {
    this.prevStep.emit()
  }

  next() {
    this.nextStep.emit()
  }

  addValue(value) {
    const dialogRef = this._dialog.open(SingleInputModalComponent, {
      disableClose: true,
      width: 'auto',
      data : {title: value}
    });

    dialogRef.afterClosed().subscribe((res) => {
      
    });
  }

  preventNegatives(e, preventDecimal?:boolean) {
    if(preventDecimal) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 ||e.keyCode == 17 || e.keyCode == 110)) {
        if(e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37  && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        }else {
          return true;
        }
    }
    }else {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        if(e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37  && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        }else {
          return true;
        }
    }
    }
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }
}
