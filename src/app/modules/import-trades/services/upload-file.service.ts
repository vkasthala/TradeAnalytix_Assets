import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})

export class UploadFileService {
    private apiUrl = environment.apiUrl + "/trades";
    constructor(private httpService: HttpService) { }

    importTrades(file: File, selectedbroker: number): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.httpService.postWithForm(`${this.apiUrl}/upload/${selectedbroker}`,formData);
    }
}