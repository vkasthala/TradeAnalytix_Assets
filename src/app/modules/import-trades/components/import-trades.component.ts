import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from 'src/app/modules/import-trades/services/upload-file.service';

@Component({
  selector: 'app-import-trades',
  templateUrl: './import-trades.component.html',
  styleUrls: ['./import-trades.component.scss']
})
export class ImportTradesComponent implements OnInit {

  selectedFiles: FileList;
  optionFile: File;
  currentFile: File;
  selectedbroker: any;
  constructor(private uploadService: UploadFileService,
    protected toastr: ToastrService,
    protected router: Router
  ) { }

  ngOnInit() {
  }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  importTrades() {    
    console.log('selectedbroker------>',this.selectedbroker);
    if(this.selectedFiles !== undefined && this.selectedFiles.length > 0) {
      this.currentFile = this.selectedFiles.item(0);
      this.uploadService.importTrades(this.currentFile, this.optionFile, this.selectedbroker).subscribe(
        event => {
          window.location.reload();
          this.toastr.success('Your trades have been sucessfully imported. Uploaded Records: ____; Failed Records: ____', 'Success');
        },
        err => {
          this.toastr.error('Failed to Import Trades', 'Error', 
          { 
            tapToDismiss:false,
            closeButton:true,
            disableTimeOut: true
          });
          this.currentFile = undefined;
          window.location.reload();
        });
      this.selectedFiles = undefined;
    }
    else{
      this.toastr.error('Please select a file import trades', 'Error', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      window.location.reload();
    }
  }
}


