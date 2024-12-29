/* define pacakges */
const mongoose = require('mongoose');


/* db connect function */
async function getDatabase(){

    /* db connect code here */
    mongoose.connect('mongodb://127.0.0.1:27017/library').then(()=>{
        console.log('Database Connected!');
    }).catch((err) => {
        console.log(err.message);
    });
    
}


/* function export */
module.exports = {
    getDatabase
};