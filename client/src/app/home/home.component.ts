import { Component,ElementRef } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';
declare let jquery:any;
declare let $: any;

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

	registerCredentials: TokenPayload = {
		username: '',
		email: '',
		password: '',
		category: '',
		name: '',
		phone: null
	};

	loginCredentials: TokenPayload = {
		username: '',
		password: ''
	};
  
	@ViewChild('welcome') welcome: ElementRef;
	@ViewChild('next') next: ElementRef;

	category = "individual";
	login = false;
	btnactive = false;
	

  constructor(private auth: AuthenticationService, private router: Router) {
	}

  loginSignup(){
    this.login = !this.login;
  }

  submit(){
    this.btnactive = false;
  }


  alterDisplay(){
		this.welcome.nativeElement.style.display = "none";
		this.next.nativeElement.style.display = "block";
		
	}
	
	nextForm(){
		this.next.nativeElement.style.display = "none";		
		this.welcome.nativeElement.style.display = "block";
		this.welcome.nativeElement.style.transition = "2s ease-in";
	}

	selectedCategory(){
		var selectedcategory = document.querySelector('input[name="category"]:checked') as HTMLInputElement;
		this.category = selectedcategory.value;
	
	}
	

	signin(){

		this.auth.login(this.loginCredentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    }); 
	}

	register(){
		this.auth.register(this.registerCredentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
	}

	// this.username = new FormControl('agustin', Validators.required);
  

}
