import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../category/Product';
import { AuthCookie } from '../auth-cookies-handler';
import { Router } from '@angular/router';
import { way } from '../config';

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
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    if (!this._authCookie.getAuth()) {
      return this.router.navigate(["/"]);
    }
    this.httpClient.post(`${way}/category`, `data=${JSON.stringify({token: this._authCookie.getAuth()})}`, this.options).subscribe((result: any) => {
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
    this.httpClient.post(`${way}/category/create`,`data=${JSON.stringify({token: this._authCookie.getAuth(), data: this.product})}`,  this.options).subscribe((result: any) => {
      if (!result) return;
      this.products.push({id: result.id, category: result.category, price: result.price, description: result.description, url: result.url});
      this.product = new Product();
    });
  }

  buttonLoadUpdateClick(id: string) {
    this.product = JSON.parse(JSON.stringify(this.products.find(x => x.id == parseInt(id))));
    this.isUpdate = true;
  }

  Update() {
    console.log(this.product);
    this.httpClient.post(`${way}/category/update`, `data=${JSON.stringify({token: this._authCookie.getAuth(), data: this.product})}`, this.options).subscribe((result: any) => {
      console.log("RESULT");
      if (!result) return;
      let productsIndex = this.products.findIndex(x => x.id == result.id);
      if (productsIndex == -1) return;
      this.products[productsIndex] = result;
      this.product = new Product();
    });
    this.isUpdate = false;
  }
  
  buttonDeleteClick(id: number) {
    this.httpClient.post(`${way}/category/delete`, `data=${JSON.stringify({token: this._authCookie.getAuth(), data: {
      id: id
    }})}`, this.options).subscribe((result: any) => {
      if (result) {
        let productsIndex = this.products.findIndex(x => x.id == id);
        if (productsIndex == -1) return;
        this.products.splice(productsIndex, 1);
      }
    });
  }

}