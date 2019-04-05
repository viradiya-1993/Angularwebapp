import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  constructor(private http: HttpClient) { }

  MatterEstimatesData(){
    return this.http.get<any>(environment.APIEndpoint + 'GetMatterEstimates');
  }
}
