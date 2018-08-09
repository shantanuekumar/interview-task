import { Component, OnInit } from '@angular/core';

import { product } from '../authentication.service';

export interface CartState {
 loaded: boolean;
 products : product[];

}


@Component({
  selector: 'app-cart-state',
  templateUrl: './cart-state.component.html',
  styleUrls: ['./cart-state.component.css']
})
export class CartStateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
