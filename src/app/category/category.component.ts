import { Component, OnInit } from '@angular/core';
import { Product } from './Product';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthCookie } from '../auth-cookies-handler';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

  products: Product[] = [];
  productsView: any = [];
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.post('http://localhost:3001/category', {token: this._authCookie.getAuth(), pageName: "category"}, this.options).subscribe((result: any) => {
      if (result) {
        this.products = result;
        let categories = [];
        this.products.forEach(product => {
          if (categories.includes(product.category)) return;
          categories.push(product.category);
        });
        categories.forEach(category => {
          this.productsView.push({
            name:category,
            array:[]
          });
          this.productsView[this.productsView.length-1].array[0] = [];
          let productsByCategory = this.products.filter(x => x.category == category);
          for (let i = 0, j = 0; i * 3 + j < productsByCategory.length; j++) {
            if (j > 2) {
              j = 0;
              i++;
              this.productsView[this.productsView.length-1].array[i] = [];
            }
            this.productsView[this.productsView.length-1].array[i][j] = productsByCategory[i * 3 + j];
          }
        });     
      }
      else {
        this.router.navigate(["/"]);
      }
      
      console.log(this.productsView);
    });
  }
}