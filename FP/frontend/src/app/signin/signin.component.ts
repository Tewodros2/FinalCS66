import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  template: `
    <!-- <form class="forms" [formGroup]="forms" (ngSubmit)="handleSubmit()">
      <div>
        <input
          class="form-control "
          formControlName="email"
          placeholder="email"
        />
      </div>

      <div>
        <input
          class="form-control  "
          formControlName="password"
          placeholder="password"
          type="password"
        />
      </div>

      <button class="btn" type="submit" [disabled]="forms.invalid">
        Login
      </button>
    </form> -->
    <div class="login-forms">
      <form [formGroup]="forms" (ngSubmit)="handleSubmit()" class="forms">
        <div class="col-sm-4">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control courseCode "
            id="email"
            formControlName="email"
            placeholder="user email"
          />
          <!-- <div *ngIf="email?.touched && email?.invalid" class="alert alert-danger">
      <div *ngIf="email?.errors?.['required']">user email required</div>
    </div> -->
        </div>
        <div class="col-sm-4">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            formControlName="password"
            placeholder="User password"
          />
          <!-- <div *ngIf="password?.touched && password?.invalid" class="alert alert-danger">
         User Password required
        </div>    -->
        </div>
        <button
          class="btn btn-success"
          [disabled]="forms.invalid || forms.pristine"
        >
          Login
        </button>
        <!-- <div class="err" *ngIf="invalid">Invalid users</div> -->
      </form>
      <!-- <button class="create-btn btn btn-primary" (click)="navigateToSignUp()" >Create new User</button> -->
    </div>
  `,
  styles: [
    `
      .btn {
        margin-bottom: 10px;
        margin-top: 10px;
        width: 100px;
        margin-left: 30px;
      }

      .forms {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
      }
      .form-control {
        display: flex;
        flex-direction: row;
        width: 350px;
      }
    `,
  ],
})
export class SigninComponent implements OnInit {
  forms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signin: SigninService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.forms.value);
    const { email, password } = this.forms.value;
    this.signin.signin(email, password).subscribe({
      next: ({ payload, user }: any) => {
        console.log(payload, user);
        localStorage.setItem('token', payload);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role === 'buyer') {
          this.router.navigateByUrl('/');
          this.router.navigateByUrl('/products/all');
        } else if (user.role === 'admin') {
          this.router.navigateByUrl('/');
          this.router.navigateByUrl('/products/mine');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
