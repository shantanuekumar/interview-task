var mongo = require('mongoose');
var Cart = mongo.model('Cart');

module.exports.updateCart = (req, res) => {

    var cart = new Cart();

    cart.products = req.body.products;
    cart.email = req.body.email;

        Cart
            .find({email: req.body.email })
            .remove(function(err){
                if(err){
                    res.status(404);
                    res.json(err)
                }
                else{

                    cart.save(function(err){
                        res.status(200);
                        res.json({
                            "state": "success"
                        })
                    });
                    
                }
                

            });
        
}

module.exports.getCart = (req, res) => {

       
       
        Cart
            .find({email:req.payload.email})
            .exec(function(err,cart){
                res.status(200).json(cart);
            });

}