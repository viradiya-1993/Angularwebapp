import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileNotesService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any>(environment.APIEndpoint + 'GetMatterFileNote?MatterGUID=MATAAAAAAAAAAA11');

       }
}
