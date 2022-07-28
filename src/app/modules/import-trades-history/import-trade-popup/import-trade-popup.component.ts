import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/modules/import-trades/services/upload-file.service';
import { BrokerageService } from '../../shared/services/brokerage.service';
import { Brokerage } from '../models/brokerage.model';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';

@Component({
  selector: 'app-import-trade-popup',
  templateUrl: './import-trade-popup.component.html',
  styleUrls: ['./import-trade-popup.component.scss']
})
export class ImportTradePopupComponent implements OnInit {

  brokerages: Brokerage[] = [];

  selectedFiles: FileList;
  selectedOptionFiles: FileList;
  currentFile: File;
  optionFile: File;
  selectedbroker: any = 1;
  processing: boolean = false;
  selectedBrokerage: Brokerage;
  isDemoMode: boolean = false;

  constructor(
    private uploadService: UploadFileService,
    private brokerageService: BrokerageService,
    protected toastr: ToastrService,
    protected router: Router,
    public dialogRef: MatDialogRef<ImportTradePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    protected demoService: DemoModeDetailsService,
  ) {
    if (data && data.selectedbroker) {
      this.selectedbroker = data.selectedbroker;
    }
  }


  ngOnInit() {
    this.isDemoMode = this.demoService.demoMode;
    this.brokerageService.getBrokerages().subscribe(result => {
      this.brokerages = result;
      if (this.selectedbroker) {
        this.brokerages.filter(brokerage => brokerage.id == this.selectedbroker).forEach(brokerage => this.selectedBrokerage = brokerage);
      }
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  selectOptionsFile(event) {
    this.selectedOptionFiles = event.target.files;
  }

  importTrades() {
    console.log('selectedbroker------>', this.selectedbroker);

    // Option file (optional)
    if (this.selectedOptionFiles !== undefined && this.selectedOptionFiles.length > 0) {
      this.optionFile = this.selectedOptionFiles.item(0);
    }

    // Equity file (manadatory)
    if (this.selectedFiles !== undefined && this.selectedFiles.length > 0) {
      this.currentFile = this.selectedFiles.item(0);
    }

    if (this.currentFile || this.optionFile) {
      this.processing = true;
      this.uploadService.importTrades(this.currentFile, this.optionFile, this.selectedbroker).subscribe(
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
          this.toastr.error('Failed to import trades.' + (err.error ? ' Error message: ' + err.error : ''), 'Error', {
            tapToDismiss: false,
            closeButton: true,
            disableTimeOut: true,
            timeOut: 0
          });
          this.currentFile = undefined;
          this.optionFile = undefined;
        });
      this.selectedFiles = undefined;
      this.selectedOptionFiles = undefined;
    }
    else {
      this.toastr.error('Please select a file import trades', 'Error',
        {
          tapToDismiss: false,
          closeButton: true,
          disableTimeOut: true
        });
    }
  }

  onBrokerageChange(val, index) {
    if (this.brokerages) {
      this.brokerages.filter(brokerage => (brokerage.id == this.selectedbroker)).forEach(brokerage => this.selectedBrokerage = brokerage);
    }
    console.log('brokerage::', this.selectedBrokerage);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
