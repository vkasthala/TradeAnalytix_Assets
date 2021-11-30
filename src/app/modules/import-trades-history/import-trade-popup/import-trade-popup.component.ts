import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/modules/import-trades/services/upload-file.service';
import { BrokerageService } from '../../shared/services/brokerage.service';
import { Brokerage } from '../models/brokerage.model';

@Component({
  selector: 'app-import-trade-popup',
  templateUrl: './import-trade-popup.component.html',
  styleUrls: ['./import-trade-popup.component.scss']
})
export class ImportTradePopupComponent implements OnInit {

  brokerages: Brokerage[] = [];

  selectedFiles: FileList;
  currentFile: File;
  selectedbroker: any = 1;
  processing: boolean = false;

  constructor(
    private uploadService: UploadFileService,
    private brokerageService: BrokerageService,
    protected toastr: ToastrService,
    protected router: Router,
    public dialogRef: MatDialogRef<ImportTradePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }


  ngOnInit() {
    this.brokerageService.getBrokerages().subscribe(result => {
      this.brokerages = result;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  importTrades() {
    console.log('selectedbroker------>', this.selectedbroker);
    if (this.selectedFiles !== undefined && this.selectedFiles.length > 0) {
      this.currentFile = this.selectedFiles.item(0);
      this.processing = true;
      this.uploadService.importTrades(this.currentFile, this.selectedbroker).subscribe(
        result => {
          this.processing = false;
          this.dialogRef.close(true);
          console.log('import result:', result);
          let newCount: any = result['newRecordCount'] ? result['newRecordCount'] : '0';
          let updatedCount: any = result['updateRecordCount'] ? result['updateRecordCount'] : '0';
          let closedCount: any = result['closedRecordCount'] ? result['closedRecordCount'] : '0';
          let failedCount: any = result['failedPersistRecordCount'] ? result['failedPersistRecordCount'] : '0';
          let failedRows: any = result['failedRecords'] ? result['failedRecords'].length : 0;
          let message = 'New positions count: ' + newCount
            + ',  Updated positions count: ' + updatedCount
            + ',  Closed positions count: ' + closedCount
            + ',  Failed positions count: ' + failedCount
            + ',  Unprocessed rows count: ' + failedRows;
          this.toastr.success(message, 'Import Trade Result', { timeOut: 0 });
        },
        err => {
          this.processing = false;
          this.toastr.error('Failed to import trades.' + (err.error && err.error.message ? ' Error message: ' + err.error.message : ''), 'Error', { 
            tapToDismiss:false,
            closeButton:true,
            disableTimeOut: true,
            timeOut: 0 
          });
          this.currentFile = undefined;
        });
      this.selectedFiles = undefined;
    }
    else {
      this.toastr.error('Please select a file import trades', '', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
