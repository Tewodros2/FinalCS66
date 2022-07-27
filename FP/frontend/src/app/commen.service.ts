import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  upload(form: any) {
    console.log(form)
    // http header: JSON, FormData, Text, XML
    return this.http.post('http://localhost:3000/upload/picture', form)
  }
 

}