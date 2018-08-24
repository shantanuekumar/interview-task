import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { DragScrollComponent } from '../../../node_modules/ngx-drag-scroll';
import { AuthenticationService, work } from '../authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-featured-work',
  templateUrl: './featured-work.component.html',
  styleUrls: ['./featured-work.component.css'],
  viewProviders: [MatIconRegistry]
})
export class FeaturedWorkComponent implements OnInit {

  title = 'app works!';
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;

  imgarrlen;

  imagelist = [
    // 'one.jpg',
    // 'two.jpg',
    // 'three.jpg',
    // 'one.jpg',
    // 'two.jpg',
    // 'three.jpg',
    // 'one.jpg',
    // 'two.jpg',
    // 'three.jpg',
    // 'one.jpg',
    // 'two.jpg',
    // 'three.jpg'
  ];

  updatework:work = {
    image:'',
    image_type: '',
    imagelength: 0,
    _id:this.auth.getUserDetails()._id
  }
 
  leftNavDisabled = false;
  rightNavDisabled = false;
  @Input() data;
  @ViewChild('nav') ds: DragScrollComponent;


  constructor(private auth: AuthenticationService, private router: Router,
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    matIconRegistry
        .addSvgIcon('github',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg'))
        .registerFontClassAlias('fontawesome', 'fa');
      
  }


  ngOnInit() {
      // console.log(this.data);
      // this.imagelist = this.data;

      this.auth.profile().subscribe(user => {

        this.imagelist = user.work_img.reverse();
        this.updatework.imagelength = this.imagelist.length;
       
  })
  }

  clickItem(item) {
    console.log('item clicked');
  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }
  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }
  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    
    this.ds.moveRight();
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }

  readFile(input,name){
    var self = this;
    if (input.target.files && input.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
           
            // self.profileImage = reader.result;
            self.updatework.image = reader.result;
            self.updatework.image_type = name[0].type.split("/")[1];
            self.update(self.updatework);

           
        }
        reader.readAsDataURL(input.target.files[0]);
    }
  }

  update(e){
    this.auth.updatework(e).subscribe((res)=>{
    

      this.imagelist = res.work_img.reverse();
      this.updatework.imagelength = res.work_img.length;
      
     
    },(err) => {
      console.log(err);
    });  
  }


}
