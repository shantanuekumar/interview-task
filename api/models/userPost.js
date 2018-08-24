var mongo = require('mongoose');

var postSchema = new mongo.Schema({
    _id: Object,
    posts:[{
        description: String,
        activity: String,
        video: String,
        location: String,
        photo: String,
        event: [{
            name: String,
            date: Date
        }],
        likes: Number,
        date: Date,
        comments: [{
            comment: String,
            comment_id: Object,
            date:Date,
            liked: Boolean      
        }],

    }],

});

mongo.model('Posts',postSchema);