const mongoose = require('mongoose');
const productOrders = require('./productOrder_sh');
require('./productmodel_sh');

(async () => {
    
    /* db connect code here */
    mongoose.connect('mongodb://127.0.0.1:27017/shop').then(()=>{
        console.log('Database Connected!');
    }).catch((err) => {
        console.log(err.message);
    });
    const orders = await productOrders.find({}).populate('product_ids');
    console.log('Orders:', orders);
   
})();
