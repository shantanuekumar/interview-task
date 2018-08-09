import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, product } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { CartServiceComponent } from '../cart-service/cart-service.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()product : product;
  
  prod : any;
  label: Object;
  constructor(private _ActivatedRoute: ActivatedRoute,public auth: AuthenticationService,private http:HttpClient, private _cartService : CartServiceComponent) {
    this.label = this._ActivatedRoute.snapshot.params['label'];
    this.prod = JSON.parse(sessionStorage.getItem('res'));
    
   this.prod.forEach(element => {
      element.added = false;
    }
    
    );
   }
   

  ngOnInit() {
  }

    AddProduct(_product : product) {
    
      _product.added = true;
        this
            ._cartService
            .addProduct(_product);
    }
   


}
