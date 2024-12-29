/* define pacakges */
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


/* create schema like table structure*/
const productOrderSchema = new mongoose.Schema({
    amount: String,
    customer_id: ObjectId,
    product_ids: [
        {
            type: ObjectId,
            ref: 'products'  // Ensure this matches the model name of the 'products' collection
        }
    ]
}, { collection: 'product_order' });

const productOrders = mongoose.model('product_order', productOrderSchema);


/* exports */
module.exports = productOrders;