import { Injectable, ɵConsole } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {

  constructor(private http: HttpClient) { }

  AddContactData(val){
      console.log("jfjkdskfhsd");
    this.http.post(environment.APIEndpoint + 'SetContact?FormAction=insert',val)
    .subscribe(res => console.log(res));

    // return this.http.post<any>(environment.APIEndpoint + 'SetContact',);
  }


  UpdateContact(val){
   // console.log(val);
    //let getContactGuId = localStorage.getItem('contactGuid');
    //console.log(getContactGuId);
    // this.http.post(environment.APIEndpoint + 'SetContact?FormAction=update&?ContactGUID='+getContactGuId,val)
    this.http.post(environment.APIEndpoint + 'SetContact?FormAction=update',val)
    .subscribe(res => console.log(res));

  }

}
