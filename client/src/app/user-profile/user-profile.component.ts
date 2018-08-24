import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenUpdate, TokenRevised } from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  imageurl;


  makeVisible = true;
  strText;
  hide = true;
  edit = false;

  profileImage;
  work_image;
  name;

  constructor(private auth: AuthenticationService, private router: Router) {
   

   }

  updateCredentials : TokenUpdate = {
    image: '',
    image_type: '',
    _id: this.auth.getUserDetails()._id
 }
 
 updateAboutme : TokenRevised = {
    aboutme: '',
    _id: this.auth.getUserDetails()._id
      
 }

  ngOnInit() {
    
    this.auth.profile().subscribe(user => {
          this.name = user.name;
          this.updateCredentials.image = user.image_name;
          this.updateAboutme.aboutme = user.aboutme;
          this.work_image = user.work_img;
    })
  }

  //  testVariable() {

  //    this.strText = this.updateAboutme.aboutme;
    

  //   if(this.strText != ''){
  //       this.makeVisible = true;
  //   }
  //   this.edit= false;
             
  // }

  

  readURL(input,name) {
    var self = this;
    if (input.target.files && input.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            // $('#imagePreview').hide();
            // $('#imagePreview').fadeIn(650);
            self.profileImage = reader.result;
            // self.hide = true;
            self.updateCredentials.image = reader.result;
            self.updateCredentials.image_type = name[0].type.split("/")[1];
            self.update(self.updateCredentials);
           
        }
        reader.readAsDataURL(input.target.files[0]);
    }
  }

  update(e){

      
      this.auth.updateProfile(e).subscribe((res)=>{
        this.imageurl = res.image_name; 
        // this.updateCredentials.image = res.image_name;
        this.updateAboutme.aboutme = res.aboutme;
        
        // e.preventDefault();
       
      },(err) => {
        console.log(err);
      });  
  }
  
  

  editaboutme(){
      this.makeVisible = false;
      this.edit = true;
  }

  onKeydown(e, keyenter){
    if (e.key === "Enter"){
      this.updateAboutme.aboutme = keyenter.value;
      this.makeVisible = true;
      this.edit = false;
      this.update(this.updateAboutme);
    }
  }

}
