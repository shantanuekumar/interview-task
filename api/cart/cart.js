const config = require('./config');

class Cart {
   constructor() {
      this.data = {};
      this.data.items = [];
      this.data.totals = 0;
      this.data.formattedTotals = '';
   }

   inCart(productID = 0) {
    let found = false;
    this.data.items.forEach(item => {
       if(item.id === productID) {
           found = true;
       }
    });
    return found;
}

calculateTotals() {
    this.data.totals = 0;
    this.data.items.forEach(item => {
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;

        this.data.totals += amount;
    });
    this.setFormattedTotals();
}

setFormattedTotals() {
    let format = new Intl.NumberFormat(config.locale.lang, {style: 'currency', currency: config.locale.currency });
    let totals = this.data.totals;
    this.data.formattedTotals = format.format(totals);
}

addToCart(product = null, qty = 1) {
    if(!this.inCart(product.product_id)) {
        let format = new Intl.NumberFormat(config.locale.lang, {style: 'currency', currency: config.locale.currency });
        let prod = {
          id: product.product_id,
          title: product.title,
          price: product.price,
          qty: qty,
          image: product.image,
          formattedPrice: format.format(product.price)
        };
        this.data.items.push(prod);
        this.calculateTotals();
    }
}

}

module.exports = new Cart();