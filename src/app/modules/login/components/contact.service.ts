import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpService } from "../../shared/services/http.service";
import { ContactUs } from "./contact-us.model";


@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private apiUrl = environment.apiUrl;

    constructor(private httpService: HttpService) { }

    contactData(formData: ContactUs){
        return this.httpService.post(this.apiUrl + '/contact', formData);
    }
}