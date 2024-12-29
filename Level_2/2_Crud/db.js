/* define pacakges */
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const getObjectId = mongodb.ObjectId;

let database;


/* db connect function */
async function getDatabase(){

    /* db connect code here */
    const client = await mongoClient.connect('mongodb://127.0.0.1:27017');
    
    /* database name here */
    database = client.db('library');

    if(!database){
        console.log('Database not connected');
    }
    return database;
}


/* function export */
module.exports = {
    getDatabase,
    getObjectId
};