import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';

@Component({
  selector: 'app-trade-thesis',
  templateUrl: './trade-thesis.component.html',
  styleUrls: ['./trade-thesis.component.scss']
})
export class TradeThesisComponent implements OnInit {
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

}
