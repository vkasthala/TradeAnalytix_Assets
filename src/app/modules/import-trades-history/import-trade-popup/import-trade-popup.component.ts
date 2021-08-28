import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/modules/import-trades/services/upload-file.service';

@Component({
  selector: 'app-import-trade-popup',
  templateUrl: './import-trade-popup.component.html',
  styleUrls: ['./import-trade-popup.component.scss']
})
export class ImportTradePopupComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  constructor(
    private uploadService: UploadFileService,
    protected toastr: ToastrService,
    protected router: Router,
    public dialogRef: MatDialogRef<ImportTradePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }


  ngOnInit() {

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  importTrades() {
    if(this.selectedFiles !== undefined && this.selectedFiles.length > 0) {
      this.currentFile = this.selectedFiles.item(0);
      this.uploadService.importTrades(this.currentFile).subscribe(
        event => {
          this.toastr.success('Imported trades successfully', '');
          this.router.navigateByUrl("/trade-strategies");
        },
        err => {
          this.toastr.error('Failed to import trades');
          this.currentFile = undefined;
          window.location.reload();
        });
      this.selectedFiles = undefined;
    }
    else{
      this.toastr.error('Please select a file import trades');
      window.location.reload();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
