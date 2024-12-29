/* define pacakges */
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebar = require('express-handlebars');
const path = require('path');

/* declare express function in app variable */
const app = express();


/* another file import */
const dbo = require('./db_sh');
const bookModelFile = require('./models/book_sh');


/* database connected fuunction call */
dbo.getDatabase();


/* handlebar template config */
app.set('view engine' , 'hbs');
app.engine('.hbs' , expressHandlebar.engine({ 
    extname : '.hbs' , 
    defaultLayout : false,
    runtimeOptions : {
        allowProtoPropertiesByDefault : true ,
        allowProtoMethodsByDefault : true
    }
}));
app.set('views' , path.join(__dirname , 'views'));


/* middleware config */
app.use(bodyParser.urlencoded({extended : true}));





/* Routes */
app.get('/' , async (req , res) => {
    /* get all value */
    const booksDetails = await bookModelFile.find({});
    
    let editData;
    let editId;

    if(req.query.id){
        editId = req.query.id;
        /* get all value */
        editData = await bookModelFile.findOne( { _id : editId } );
    }

    switch(req.query.status){
        case '1':
            message = 'Inserted Succesfully!';
            break;
        case '2':
            message = 'Updated Succesfully!';
            break;
        case '3':
            message = 'Deleted Succesfully!';
            break;
        default:
            message = '';
            break
    }
    /* message send to view */
    res.status(200).render('main' , {
        docTitle : 'MongoDB CRUD Operation',
        HeadingMessage : 'MongoDB CRUD!',
        booksData : booksDetails,
        booksData_count : booksDetails.length > 0,
        statusMessage : message,
        editData : editData,
        editData_count : editData != null
    });
});

app.post('/storebooks' , async (req , res) => {

    /* get value from form */
    let book = {
        title : req.body.title,
        author : req.body.author
    };

    const bookInfo = new bookModelFile(book);
    bookInfo.save();
    return res.redirect('/?status=1');

});

app.post('/updatebooks/:id' , async (req , res) => {

    /* get value from form */
    let book = {
        title : req.body.title,
        author : req.body.author
    };
    let editID = req.params.id;

    /* get all value */
    const cursor = await bookModelFile.findByIdAndUpdate( {_id : editID} , book );
    return res.redirect('/?status=2');
});

app.get('/deletebooks/:id' , async (req , res) => {

    let editID = req.params.id;

    /* get all value */
    const cursor = await bookModelFile.deleteOne( {_id : editID} );
    return res.redirect('/?status=3');
});


/* Listen port */
app.listen(8000 , () => {
    console.log('Server is running in 8000 Port');
});


