import { Component, OnInit } from '@angular/core';
import { product } from '../authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { CartState } from '../cartstate/cart-state.component';
import { CartServiceComponent } from '../cart-service/cart-service.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {


  loaded : boolean = true
    products : product[];
    private subscription : Subscription;
    constructor(private _cartService : CartServiceComponent) {}
    ngOnInit() {
        // this.loaderService.show();
        this.subscription = this
            ._cartService
            .CartState
            .subscribe((state : CartState) => {
                this.products = state.products;
                console.log(this.products);
            });

    }
    ngOnDestroy() {
        this
            .subscription
            .unsubscribe();
    }

}
