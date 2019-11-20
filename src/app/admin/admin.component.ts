import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../category/Product';
import { AuthCookie } from '../auth-cookies-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];

  isUpdate: boolean = false;
  product: Product = new Product();

  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }
  way = "http://localhost:3001";
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    if (!this._authCookie.getAuth()) {
      return this.router.navigate(["/"]);
    }
    this.httpClient.post(`${this.way}/category`, {token: this._authCookie.getAuth(), pageName: "admin"}, this.options).subscribe((result: any) => {
      if (result) {
        this.products = result;
      }
      else {
        this.router.navigate(["/"]);
      }
    });
  }

  buttonCreateUpdateClick() {
    if (this.isUpdate) {
      this.Update();
    }
    else {
      this.Create();
    }
  }

  Create(){
    console.log(this.product);
    this.httpClient.post(`http://localhost:3001/category/create`,{token: this._authCookie.getAuth(), data: this.product},  this.options).subscribe((result: any) => {
      console.log(result);

      if (!result) return;
      this.products.push({id: result.id, category: result.category, price: result.price, description: result.description, url: result.url});
    });
  }

  buttonLoadUpdateClick(id: string) {
    this.product = JSON.parse(JSON.stringify(this.products.find(x => x.id == parseInt(id))));
    this.isUpdate = true;
  }

  Update() {
    this.httpClient.post(`${this.way}/category/update`, {token: this._authCookie.getAuth(), data: this.product}, this.options).subscribe((result: any) => {
      if (!result) return;
      let productsIndex = this.products.findIndex(x => x.id == result.id);
      if (productsIndex == -1) return;
      this.products[productsIndex] = result;
      this.product = new Product();
    });
    this.isUpdate = false;
  }
  
  buttonDeleteClick(id: number) {
    this.httpClient.post(`${this.way}/category/delete`, {token: this._authCookie.getAuth(), data: {
      id: id
    }}, this.options).subscribe((result: any) => {
      if (result) {
        let productsIndex = this.products.findIndex(x => x.id == id);
        if (productsIndex == -1) return;
        this.products.splice(productsIndex, 1);
      }
    });
  }
}