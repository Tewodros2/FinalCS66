import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  template: `
    <!-- <form class="forms" [formGroup]="forms" (ngSubmit)="handleSubmit()">
      <div>
        <input
          class="form-control "
          formControlName="name"
          placeholder="Name"
        />
      </div>
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
      <div>
        <select class="form-control " formControlName="role" placeholder="role">
          <option value="breeder">user</option>
          <option value="buyer">admin</option>
        </select>
        <span>User|Admin</span>
      </div>

      <div>
        <input
          class="form-control "
          formControlName="phone"
          placeholder="Phone"
        />
      </div>

      <button class="btn" type="submit" [disabled]="forms.invalid">
        Signup
      </button>
    </form> -->

    <div class="main-sing-up-forms">
      <form [formGroup]="forms" (ngSubmit)="handleSubmit()">
        <div class="userInfo"><h3>user information</h3></div>
        <div class="col-sm-4">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            class="form-control courseCode"
            id="email"
            formControlName="name"
            placeholder="Full Name"
          />
          <!-- <div
            *ngIf="name?.touched && fullName?.invalid"
            class="alert alert-danger"
          >
            <div *ngIf="fullName?.errors?.['required']">Full Name required</div>
            <div *ngIf="email?.errors?.['existed']" class="alert alert-danger">
              Duplication is not allowed
            </div>
          </div> -->
        </div>
        <div class="col-sm-4">
          <label for="email">User email</label>
          <input
            type="text"
            class="form-control courseCode"
            id="email"
            formControlName="email"
            placeholder="user email"
          />
          <!-- <div
            *ngIf="email?.touched && email?.invalid"
            class="alert alert-danger"
          >
            <div *ngIf="email?.errors?.['required']">user email required</div>
            <div *ngIf="email?.errors?.['existed']" class="alert alert-danger">
              Email must be unique
            </div>
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
          <!-- <div
            *ngIf="password?.touched && password?.invalid"
            class="alert alert-danger"
          >
            Password required
          </div> -->
        </div>
        <p></p>
        <div class="col-sm-4">
          <label for="role">Role</label>
          <select formControlName="role" id="role">
            <!-- <option value="admin">Admin</option> -->
            <option value="admin">Admin</option>
            <option value="buyer">Buyer</option>
          </select>
          <!-- <div
            *ngIf="role?.touched && role?.invalid"
            class="alert alert-danger"
          >
            Role required
          </div> -->
        </div>
        <div class="col-sm-4">
          <label for="phone">Phone</label>
          <input
            type="text"
            class="form-control courseCode"
            id="phone"
            formControlName="phone"
            placeholder="phone"
          />
          <!-- <div
            *ngIf="phone?.touched && phone?.invalid"
            class="alert alert-danger"
          >
            <div *ngIf="phone?.errors?.['required']">Phone required</div>
          </div> -->
        </div>

        <button
          class="btn btn-primary"
          class="btn btn-success"
          [disabled]="forms.invalid || forms.pristine"
        >
          Signup
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .btn {
        margin-bottom: 10px;
        margin-top: 20px;
        width: 100px;
        margin-left: 40px;
      }

      .forms {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
      }
      .form-control {
        display: flex;
        flex-direction: row;
      }
      .main-sing-up-forms {
        margin-left: 60px;
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  forms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signup: SignupService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.forms.value);
    const data = this.forms.value;
    this.signup.signup(data).subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.router.navigateByUrl('/signin');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
