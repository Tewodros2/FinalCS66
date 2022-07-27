import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../commen.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-add',
  template: `
    <div class="container">
      <div class="">
        <label class="">Photo</label>
        <div>
          <input
            #ref
            type="file"
            name="image"
            class="custom-file-input"
            style="visibilty: hidden;
                  opacity: 0;
                  height: 0;
                  width: 0"
            (change)="setImage($event)"
          />
          <button (click)="setBrowse($event)">Browse...</button>
        </div>
        <div>{{ filename }}</div>
      </div>
      <form [formGroup]="forms" (ngSubmit)="addProduct()">
        <div>
          <input
            class="form-control name "
            formControlName="name"
            placeholder="Product name"
          />
        </div>
        <div>
          <input
            class="form-control category "
            formControlName="category"
            placeholder="category"
          />
        </div>
        <div>
          <input
            class="form-control description "
            formControlName="description"
            placeholder="description"
          />
        </div>
        <div>
          <input
            class="form-control quantity "
            formControlName="quantity"
            placeholder="quantity"
          />
        </div>
        <div>
          <input
            class="form-control price "
            formControlName="price"
            placeholder=" price"
          />
        </div>
        <button type="submit" [disabled]="forms.invalid">
          Add New Product
        </button>
      </form>
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
export class AddProductsComponent {
  forms!: FormGroup;
  subscribe!: Subscription;
  picture: string = '';
  @Input() product: any = {};
  filename: string = '';
  file!: File;
  @ViewChild('ref') ref: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private productService: ProductService
  ) {
    this.forms = formBuilder.group({
      name: ['ABC', Validators.required],
      category: ['Apple', Validators.required],
      description: ['iphone 13', Validators.required],
      quantity: ['1', Validators.required],
      price: ['1100', Validators.required],
    });
  }
  // ngOnInit(): void {}
  // async addProduct() {
  //   this.uploadPicture().subscribe({
  //     next: ({ payload }: any) => {
  //       this.picture = payload.picture;
  //       this.saveProduct();
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }

  async addProduct() {
    this.uploadPicture().subscribe({
      next: ({ payload }: any) => {
        this.picture = payload.picture;
        this.saveProduct();
      },
      error: (err) => console.log(err),
    });
  }
  saveProduct() {
    const data = this.forms.value;
    console.log('====================================');
    console.log(this.picture);
    console.log('====================================');
    this.productService
      .addProduct({
        name: data.name,
        category: data.category,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        picture: this.picture,
      })
      .subscribe({
        next: ({ payload }: any) => {
          console.log(payload);
          this.router.navigateByUrl('products/main');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  setBrowse = (e: any) => {
    e.preventDefault();
    console.log(this.ref);
    this.ref.nativeElement.click(); // automatic click
  };

  setImage = (e: any) => {
    e.preventDefault();
    const file: File = e.target.files[0];
    const types = ['png', 'jpg', 'jpeg'];
    types.forEach((item) => {
      if (file.type && file.type.includes(item)) {
        console.log(item);
        return;
      }
    });
    this.filename = file.name;
    this.file = file;
    console.log('====================================');
    console.log(this.file);
    this.picture = this.file.lastModified.toString();
    console.log(this.picture);
    console.log('====================================');
  };

  uploadPicture() {
    const formData = new FormData();
    formData.append('file', this.file);
    return this.commonService.upload(formData);
  }
}
