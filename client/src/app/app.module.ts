import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatCommonModule,
  MatIconModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  
  

} from '@angular/material';

import {MatDialogModule} from '@angular/material';



import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CartStateComponent } from './cartstate/cart-state.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CartServiceComponent } from './cart-service/cart-service.component';
import { NumberDirective } from './directive/number.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { FeaturedWorkComponent } from './featured-work/featured-work.component';
import { DragScrollModule } from '../';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:label', component: ProductComponent },
  { path: 'cart', component: CartComponent},
  { path: 'cart-service', component: CartServiceComponent},
  { path: 'cart-state', component: CartStateComponent},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    PaymentsComponent,
    ProductsComponent,
    ProductComponent,
    CartStateComponent,
    ShoppingListComponent,
    CartServiceComponent,
    NumberDirective,
    UserProfileComponent,
    PostUpdateComponent,
    FeaturedWorkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragScrollModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatCommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [
    PostUpdateComponent
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    CartServiceComponent
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
