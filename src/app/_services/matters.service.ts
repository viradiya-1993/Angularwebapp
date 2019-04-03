import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MattersService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getMatters() {
    return this.httpClient.get<any>(environment.APIEndpoint + 'GetMatter');
  }
  getMattersDetail(MatterGuid) {
    return this.httpClient.get<any>(environment.APIEndpoint + 'GetMatter?MatterGuid=' + MatterGuid);
  }
  getMattersContact(MatterGuid) {
    return this.httpClient.get<any>(environment.APIEndpoint + 'GetMatterContact?MatterGuid=' + MatterGuid);
  }
}
