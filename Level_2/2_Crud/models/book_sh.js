/* define pacakges */
const mongoose = require('mongoose');


/* create schema like table structure*/
const bookSchema = new mongoose.Schema({
    title : String,
    author : String
});

/* create model like table */
const bookModel = mongoose.model('book' , bookSchema);


/* exports */
module.exports = bookModel;