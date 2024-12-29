/* define pacakges */
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebar = require('express-handlebars');
const path = require('path');

/* declare express function in app variable */
const app = express();


/* another file import */
const dbo = require('./db');


/* handlebar template config */
app.set('view engine' , 'hbs');
app.engine('.hbs' , expressHandlebar.engine({ extname : '.hbs' , defaultLayout : false }));
app.set('views' , path.join(__dirname , 'views'));


/* middleware config */
app.use(bodyParser.urlencoded({extended : true}));



/* Routes */
app.get('/' , async (req , res) => {

    /* call function */
    let databaseFunction = await dbo.getDatabase();
    const objectId = dbo.getObjectId;
    
    /* create collection */
    const collection = databaseFunction.collection('books');

    /* get all value */
    const cursor = collection.find({});
    let booksDetails = await cursor.toArray();

    let editData;
    let editId;

    if(req.query.id){
        editId = req.query.id;
        /* get all value */
        editData = await collection.findOne({_id : new objectId(editId)});
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
    /* call function */
    let databaseFunction = await dbo.getDatabase();

    /* create collection */
    const collection = databaseFunction.collection('books');

    /* get value from form */
    let book = {
        title : req.body.title,
        author : req.body.author
    };
    await collection.insertOne(book);
    return res.redirect('/?status=1');

});

app.post('/updatebooks/:id' , async (req , res) => {

    /* call function */
    let databaseFunction = await dbo.getDatabase();
    const objectId = dbo.getObjectId;
   
    
    /* create collection */
    const collection = databaseFunction.collection('books');

    /* get value from form */
    let book = {
        title : req.body.title,
        author : req.body.author
    };
    let editID = req.params.id;

    /* get all value */
    const cursor = await collection.updateOne( {_id : new objectId(editID)} , { $set : book } );
    return res.redirect('/?status=2');
});

app.get('/deletebooks/:id' , async (req , res) => {

    /* call function */
    let databaseFunction = await dbo.getDatabase();
    const objectId = dbo.getObjectId;
   
    
    /* create collection */
    const collection = databaseFunction.collection('books');

    let editID = req.params.id;

    /* get all value */
    const cursor = await collection.deleteOne( {_id : new objectId(editID)} );
    return res.redirect('/?status=3');
});


/* Listen port */
app.listen(8000 , () => {
    console.log('Server is running in 8000 Port');
});


