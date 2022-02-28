import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import * as FileSaver from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  formatValueToPercentage(value) {
    return `${value}%`;
  }

  downloadFile(fileId: String): void {
    let url = this.apiUrl + '/download/' + fileId;
    this.httpService.getWIthReponseType(url, new Map(), new Map()).subscribe(response => {
      const blob = new Blob([response]);
      FileSaver.saveAs(blob, fileId)
    },
      error => {
        console.log('error in file downloading', error);
      });
  }

}
