import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';

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

}
