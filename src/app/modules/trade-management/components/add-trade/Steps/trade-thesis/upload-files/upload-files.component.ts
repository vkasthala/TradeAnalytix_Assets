import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ChubUploadService } from 'src/app/modules/shared/services/chub-upload.service';
import { TradeChubFile } from 'src/app/modules/trade-management/models/trade-chub-file.model';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  tradeChubFiles: TradeChubFile[] = [];

  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;

  constructor(
    // private _dialog: MatDialog,
    // private metadataService: UserMetadataService,
    // private dataSetupService: DataSetupService,
    private chubUploadService: ChubUploadService,
    private toastr: ToastrService,
  //   private tradeStrategySevice: TradeStrategyService,
  //   private dynamicFieldsService: DynamicFieldsService,
  //   private userMetadataStoreService: UserMetadataStoreService,
  //   protected userTagService: UserTagService
  ) {

  }

  ngOnInit() {
    
  }

  selectFile(event) {
    var selectedFiles: FileList = event.target.files;
    if (selectedFiles) {
      for (var ind = 0; ind < selectedFiles.length; ind++) {
        if (!this.isValidFile(selectedFiles.item(ind))) {
          event.target.value = null;
          break;
        }
        this.chubUploadService.uploadFile(selectedFiles.item(ind)).subscribe(result => {
          var chubFile: TradeChubFile = this.createTradeChubFile(result);
          if (chubFile) {
            this.tradeChubFiles.push(chubFile);
            event.target.value = null;
            console.log('chub files after: ', this.tradeChubFiles);
          }
        });
      }
    }
  }

  isValidFile(file: File): boolean {
    var valid: boolean = true;
    if (!file.name.toLocaleLowerCase().endsWith('.pdf')
      && !file.name.toLocaleLowerCase().endsWith('.png')
      && !file.name.toLocaleLowerCase().endsWith('.jpg')
      && !file.name.toLocaleLowerCase().endsWith('.jpeg')
      && !file.name.toLocaleLowerCase().endsWith('.bmp')
      && !file.name.toLocaleLowerCase().endsWith('.doc')
      && !file.name.toLocaleLowerCase().endsWith('.docx')
      && !file.name.toLocaleLowerCase().endsWith('.xls')
      && !file.name.toLocaleLowerCase().endsWith('.xlsx')
      && !file.name.toLocaleLowerCase().endsWith('.ppt')
      && !file.name.toLocaleLowerCase().endsWith('.pptx')) {
      valid = false;
      this.toastr.error('Please select valid file', 'Invalid File');
      return valid;
    }

    if (file.size > 1048576) {
      this.toastr.error('Please select file with size less than 1MB', 'File size exceeded');
      valid = false;
    }
    return valid;
  }

  createTradeChubFile(result: any): TradeChubFile {
    if (result.id) {
      var tradeChubFile: TradeChubFile = new TradeChubFile();
      tradeChubFile.chubFileId = result.id;
      tradeChubFile.fileName = result.name;
      return tradeChubFile;
    }
    return undefined;
  }

  deleteFileName(index: number) {
    if (index < this.tradeChubFiles.length) {
      var chubFile: TradeChubFile = this.tradeChubFiles[index];
      if (chubFile) {
        this.deleteChubFile(chubFile, index);
      }
    }
  }

  deleteChubFile(chubFile: TradeChubFile, ind: number) {
    this.chubUploadService.deleteFile(chubFile.chubFileId).subscribe(result => {
      this.tradeChubFiles.splice(ind, 1);
    });
  }

  downloadFile(index: number) {
    if (index < this.tradeChubFiles.length) {
      var chubFile: TradeChubFile = this.tradeChubFiles[index];
      if (chubFile) {
        this.chubUploadService.downloadFile(chubFile.chubFileId, chubFile.fileName);
      }
    }
  }
  

}
