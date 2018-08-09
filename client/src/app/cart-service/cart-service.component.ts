import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CartState} from '../cartstate/cart-state.component'
import { product, AuthenticationService } from '../authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

const url = 'http://localhost:3030/api';

@Component({
  selector: 'app-cart-service',
  templateUrl: './cart-service.component.html',
  styleUrls: ['./cart-service.component.css']
})
export class CartServiceComponent implements OnInit {

  constructor(private httpclient : HttpClient, private auth: AuthenticationService, private router: Router) {}
  

  ngOnInit() {
  }

  private cartSubject = new Subject<CartState>();
    Products : product[]= [];
    prod : Object;
    CartState = this.cartSubject.asObservable();

    

    
    addProduct(_product:any) {

      this.Products.push(_product);
    
      this.prod = {
       
        'email' : this.auth.getUserDetails().email,
        'products' :  this.Products
              
      }
      
      
    
    

      this.auth.updateCart(this.prod).subscribe((res) => {
        
          this.router.navigateByUrl('/cart');
    
      })

      
     
      this.cartSubject.next(<CartState>{loaded: true, products:  this.Products});
     
    }
    removeProduct(id:String) {
      console.log(this.Products);
      this.Products = this.Products.filter((_item) =>  _item.product_id !== id )
      this.cartSubject.next(<CartState>{loaded: false , products:  this.Products});
      
    }


  getAllProducts() : any {
    this.auth.getCart({'email': this.auth.getUserDetails().email}).subscribe((res)=>{         
          this.Products = res;
          return this.Products;

    });
    // return this.Products;
  }

  

}


