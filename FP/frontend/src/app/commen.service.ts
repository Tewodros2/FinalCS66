import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './config';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  upload(form: any) {
    console.log(form);
    // http header: JSON, FormData, Text, XML
    return this.http.post(`${api}/upload/picture`, form);
  }
}
