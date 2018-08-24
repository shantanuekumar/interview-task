import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class PostUpdateComponent implements OnInit {


  ngOnInit() {
  }
  // posts: post[];
  // title: String;

  // constructor(private createpostService:CreatepostService) { 
  //   this.createpostService.getposts()
  //   .subscribe(posts => {
  //     this.posts = posts;
  // });
  // }

  // addpost(event){
  //   event.preventDefault();
  //   console.log(this.title);
  // }
  
}
