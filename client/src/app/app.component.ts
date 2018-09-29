import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
  
 
  constructor(public auth: AuthenticationService) {
   
   
  }
  

  userSubmission(){
    this.auth.pushData(this.user).subscribe((result) => {
      console.log(result);
    })
  }
}
