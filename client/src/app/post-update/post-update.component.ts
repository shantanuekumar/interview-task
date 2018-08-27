import { Component, OnInit, ViewChild , Inject, Injectable} from '@angular/core';
import { AuthenticationService, UpdatePost } from '../authentication.service';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class PostUpdateComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

 
  map: google.maps.Map;
  marker: google.maps.Marker;
  isTracking: boolean;

  postUpdate: UpdatePost = {
    video : '',
    videoType: '',
    image: '',
    imageType: '',
    currentLat: '',
    currentLong: ''
    
  }

  ngOnInit() {

    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }


  constructor(private auth: AuthenticationService, public dialogRef: MatDialogRef<PostUpdateComponent> , @Inject(MAT_DIALOG_DATA) public data : any) { 
  
  }

  uploadVideo(e, video){
    var self = this;
    if(e.target.files && e.target.files[0]){
      var reader = new FileReader();
      reader.onload = function(e){
            self.postUpdate.video = reader.result;
            self.postUpdate.videoType = video[0].type.split("/")[1];

            console.log(self.postUpdate);

      }

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  uploadImage(e, image){
    var self = this;
    if(e.target.files && e.target.files[0]){
      var reader = new FileReader();
      reader.onload = function(e){
            self.postUpdate.image = reader.result;
            self.postUpdate.imageType = image[0].type.split("1")[1];
      }
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.postUpdate.currentLat = position.coords.latitude;
        this.postUpdate.currentLong = position.coords.longitude;
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  showTrackingPosition(position) {
    this.postUpdate.currentLat = position.coords.latitude;
    this.postUpdate.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(this.postUpdate.currentLat, this.postUpdate.currentLong);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  onCloseConfirm() {
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
  
}
