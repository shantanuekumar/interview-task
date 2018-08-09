import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email?: string;
  password: string;
  name?: string;
  username?:string;
  category?:string;
  phone?:number;

}

export interface product {
  product_category: String,
  product_category_id: Number,
  product_subcategory: String,
  product_label: String,
  product_id: String,
  added : boolean,
  product_price: Number,
  product_promotion: Number,
  product_availability: Number,
  product_brand: String,
  product_image: String,
  product_image_name: String,
  product_chemical_composition: String,
  product_unit: String,
  product_distributor: String,
  product_stock_id: String,
  product_stock_expiry_date: Date,
  product_quantity_per_stock: Number
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile'|'cart'|'product', user?: TokenPayload): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }


  
  
  
  
  // private requ(method: 'get' | 'post' , type: 'cart' | 'product', cartProduct? ): Observable<any> {
    
  //   let base;

  //   if(method === 'post'){
  //    base = this.http.post(`/api/${type}`, cartProduct);
  //   }
  //   else{
  //     base = this.http.get(`/api/${type}`);
  //   }
  //   const requ = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );
  //   return requ;
  // }
  

  public updateCart(cartProduct): Observable<any> {
    return this.request('post', 'cart', cartProduct);
  }

  public getCart(email): Observable<any> {
    return this.request('get','cart', email);
  }
  
  public fetch(): Observable<any> {
    return this.request('get', 'product');
  }
  


}
