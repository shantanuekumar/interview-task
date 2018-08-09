var mongo = require('mongoose');
var Product = mongo.model('Product');

module.exports.fetch_products = (req,res) => {

    Product
            .find()
            .exec(function(err,product){
                res.status(200).json(product);
            });
   

}