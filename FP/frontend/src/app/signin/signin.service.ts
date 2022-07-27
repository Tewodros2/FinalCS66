import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient) {}

  signin(email: string, password: string) {
    return this.http.post('http://localhost:3000/users/signin', {
      email,
      password,
    });
  }
}
