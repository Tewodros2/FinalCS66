import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
  selector: 'app-edit',
  template: `
    <div class="container">
      <form [formGroup]="forms" (ngSubmit)="editproduct()">
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
        <button type="submit" [disabled]="forms.invalid">Edit Product</button>
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
export class EditProductComponent implements OnInit {
  forms!: FormGroup;
  @Input('product') product: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log(this.product);
    this.forms = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      category: [this.product.category, Validators.required],
      description: [this.product.description, Validators.required],
      quantity: [this.product.quantity, Validators.required],
      price: [this.product.price, Validators.required],
    });
  }

  async editproduct() {
    const data = this.forms.value;
    this.productService
      .updateProduct(this.product._id, {
        name: data.name,
        category: data.category,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
      })
      .subscribe({
        next: ({ payload }: any) => {
          console.log(payload);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
