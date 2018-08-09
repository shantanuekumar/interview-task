import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
// export let product: Object = {};
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Object;

  constructor(public auth: AuthenticationService,private http:HttpClient) { 
  
    this.msg();
  }

  ngOnInit() {
  }
  msg(){
    this.auth.fetch().subscribe(res => {
      this.products = res;
      sessionStorage.setItem("res",JSON.stringify(res));
    }, (err) => {
      console.error(err);
    }); 
  }
}
