import { Component, OnInit } from '@angular/core';
import { Product } from './Product';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthCookie } from '../auth-cookies-handler';
import { WebSocketService } from '../web-socket';
import { way } from '../config';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

  products: Product[] = [];
  productsView: any = [];
  findText = '';
  lastFindText = '';
  waitTimes = 0;
  message = '';
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie, private webSocketService: WebSocketService) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  changeInput(e){
    this.findText = e.target.value.toString();
  }

  ngOnInit() {
    this.webSocketService.webSocketContext.onmessage = (result: any) => {
      console.log(result);
      result = JSON.parse(result.data);
      if (result && result.data && result.type) {
        if (result.type === "updateProducts") {
          this.products = result.data;
          console.log(this.products);

          let categories = [];
        this.products.forEach(product => {
          if (categories.includes(product.category)) return;
          categories.push(product.category);
        });
        this.productsView = [];
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
        } else if (result.type === 'updateText')  {
          this.message = result.data.object.body;
        }
      } else {
        this.router.navigate(['/']);
      }
    };
    this.httpClient.post(`${way}/category`, `data=${JSON.stringify({token: this._authCookie.getAuth(), pageName: "category"})}`, this.options).subscribe((result: any) => {
      if (result != null) {
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
    });
    setInterval(() => {
      if (this.waitTimes !== 0) {
        this.waitTimes--;
      } else {
        if (this.lastFindText !== this.findText) {
          this.lastFindText = this.findText;
          this.waitTimes = 10;
          this.httpClient.post(`${way}/category`, `data=${JSON.stringify({token: this._authCookie.getAuth(), data: { findText: this.findText }})}`, this.options).subscribe((result: any) => {
            if (result != null) {
              this.products = result;
              let authors = [];
              this.products.forEach(product => {
                if (authors.includes(product.category)) return;
                authors.push(product.category);
              });
              this.productsView = [];
              authors.forEach(category => {
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
          });
        }
      }
    }, 100);
  }
}