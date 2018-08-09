import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CartState} from '../cartstate/cart-state.component'
import { product } from '../authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CartServiceComponent } from '../cart-service/cart-service.component';
import { Router, ActivatedRoute } from '@angular/router';

const url = 'http://localhost:3030/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  Route: any;
  @Input()product : product;
  constructor(private cart_Service :CartServiceComponent,private route:ActivatedRoute,private _cartService : CartServiceComponent,private auth:AuthenticationService) {}
  Products : Promise<any>
  Prod : Promise<any>
  // product[]
  ngOnInit(){
    // this.cart_Service.getAllProducts().subscribe(
    //   data => {
    //     this.Products = data
    //    console.log(data); 
    //   }, //Bind to view
    //    err => {
    //        // Log errors if any
    //        console.log(err);
    //    });

    
    this.Route =  this.route.snapshot.url[0].path;

     this.cart_Service.getAllProducts().subscribe((res) => {
        this.Products = res.products;

        Promise.resolve(true);

        console.log(this.Prod);
    });
   

    // this.auth.getCart({'email': this.auth.getUserDetails().email}).subscribe((res)=>{
      // this.Products = this.Prod[0].products;
      // this.Prod = res;
      // Promise.resolve(true);

      // console.log(this.Prod);
    // });


  }

  RemoveProduct(_product : product) {
    _product.added = false;
    this
        ._cartService
        .removeProduct(_product.product_id);
  }

 
  
  
}
