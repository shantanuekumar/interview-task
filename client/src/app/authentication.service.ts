import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';



interface TokenResponse {
  token: string;
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

 

  

  private request(method: 'post'|'get', type: 'login'|'register'|'profile'|'cart'|'product'|'profileupdate'|'workupdate'|'updatepost'|'pushData', user?: TokenPayload): Observable<any> {
    
    let urlbase = 'http://localhost:3030';
    let base;
    if (method === 'post') {
      debugger
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

  


  public pushData(details): Observable<any> {
    return this.request('post','pushData', details);
  }

}
