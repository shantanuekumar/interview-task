var mongo = require('mongoose');
var float = require('mongoose-float').loadType(mongo);



var product = new mongo.Schema({
        product_id: String,
        // product_quantity: Number,
        price: float,
        promotion: Number,
        label: String,
        image: String,
   
})

var cartProductSchema = new mongo.Schema({

products: [product], 
email: String
})

mongo.model('Cart', cartProductSchema );