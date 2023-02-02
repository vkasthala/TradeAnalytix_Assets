import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImportTradePopupComponent } from 'src/app/modules/import-trades-history/import-trade-popup/import-trade-popup.component';

@Component({
  selector: 'app-import-tradebook',
  templateUrl: './import-tradebook.component.html',
  styleUrls: ['./import-tradebook.component.scss']
})
export class ImportTradeBookComponent implements OnInit {

  title: string;

  constructor(
    public dialogRef: MatDialogRef<ImportTradeBookComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  openImportTrade() {
    this.dialogRef.close();
    const dialogRef = this._dialog.open(ImportTradePopupComponent, {
      disableClose: true,
      width: 'auto',
      //data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      
    });
  }

}
