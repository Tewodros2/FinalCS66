import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import api from '../config';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient) {}

  signin(email: string, password: string) {
    return this.http.post(`${api}/users/signin`, {
      email,
      password,
    });
  }
}
