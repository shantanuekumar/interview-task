var mongo = require('mongoose');
var Posts = require('Posts');


module.exports.CreatePost = (req,res) =>{
    var posts = new Posts();

    
    var post = {
            description: req.body.desc,
            activity: req.body.activity,
            video: req.body.video,
            location: req.body.location,
            photo: req.body.photo,
            event: req.body.event
        };



}

