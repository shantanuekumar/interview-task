var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');
const del = require('del');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile",
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

module.exports.profileUpdate = function(req,res) {

if(req.body.image != undefined){

  var base64Data = req.body.image.replace(/^data:image\/(jpeg|jpg|png);base64,/, "");
  var imageurl = "/home/shantanu/Documents/jinglebol/react-medical-master/user_authentication/api/public/images/img-"+req.body._id+"."+req.body.image_type;
  var deleteurl = "/home/shantanu/Documents/jinglebol/react-medical-master/user_authentication/api/public/images/img-"+req.body._id;

  var image = "http://localhost:3030/profileimage/images/img-"+req.body._id+"."+req.body.image_type;

  var update = {
    
    image_name: image
   
  }
  
  del([deleteurl+'.*'],{force: true}).then(paths => {
    fs.writeFile(imageurl, base64Data, 'base64', function(err) {
      if(err){
          res.json({
              "error": err
          }) 
      }
   
    if(!req.body._id){
      res.status(401).json({
        "message" : "UnauthorizedError: private profile",
      });
    }
    else {
      updateval(update,req,res);
    } 
  
  });
  });
  
}
if(req.body.aboutme != undefined){
  var update = {
    aboutme: req.body.aboutme   
  }

  updateval(update,req,res);
}
    
};


 updateval = function(updateDetails,req,res){
  User
  .findByIdAndUpdate(req.body._id,updateDetails,{ 'new': true},function(err,raw){
    if(err){
      res.status(401).json(err);
    }

    var profile = {
      image: raw.image_name,
      aboutme: raw.aboutme
    };

    res.status(200).json(raw);
    
  });
}

module.exports.workUpdate = function(req,res){


    
    // var user = new User();

    var base64Data = req.body.image.replace(/^data:image\/(jpeg|jpg|png);base64,/, "");
    var imageurl = "/home/shantanu/Documents/jinglebol/react-medical-master/user_authentication/api/public/work-images/img-"+req.body.imagelength+"."+req.body.image_type;
    // var deleteurl = "/home/shantanu/Documents/jinglebol/react-medical-master/user_authentication/api/public/work-images/img-"+req;
  
    var image = "http://localhost:3030/profileimage/work-images/img-"+req.body.imagelength+"."+req.body.image_type;
  
      fs.writeFile(imageurl, base64Data, 'base64', function(err) {
        if(err){
            res.json({
                "error": err
            }) 
        }
     
      if(!req.body._id){
        res.status(401).json({
          "message" : "UnauthorizedError: private profile",
        });
      }
      else {
        



        User
        .findByIdAndUpdate(req.body._id,{$push: {work_img:image}},{new: true},function(err,raw){
          if(err){
            console.log(err);
            res.status(401).json(err);
          }
      
          
          res.status(200).json(raw);
          
        });


      } 
    
    });
    
    
} 


