/* define pacakges */
const mongoose = require('mongoose');


/* create schema like table structure*/
const productSchema = new mongoose.Schema({
    name : String
});

/* create model like table */
const productModel = mongoose.model('products' , productSchema);


/* exports */
module.exports = productModel;