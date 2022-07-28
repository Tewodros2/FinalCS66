import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from '../config';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${api}/users/signup`, user);
  }
}
