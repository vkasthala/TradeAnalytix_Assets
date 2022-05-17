import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import * as FileSaver from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class ChubUploadService {

  private apiUrl = environment.apiUrl + "/chub";

  constructor(private httpService: HttpService) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpService.postWithForm(`${this.apiUrl}/file-upload`, formData);
  }

  deleteFile(fileId: number): Observable<void> {
    return this.httpService.post<string, void>(this.apiUrl + '/delete-file/' + fileId, '');
  }

  downloadFile(fileId: number, fileName: string) {
    let url = this.apiUrl + '/file-download/' + fileId;
    this.httpService.getWIthReponseType(url, new Map(), new Map()).subscribe(response => {
      var blob;
      if (fileName.toLocaleLowerCase().endsWith('.xlsx')) {
        blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      } else {
        blob = new Blob([response]);
      }
      FileSaver.saveAs(blob, fileName)
    },
      error => {
        console.log('error in chub file downloading', error);
      });
  }

}
