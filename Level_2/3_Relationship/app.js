/* define pacakges */
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let database;

(async () => {
    try {
        // Connect to the MongoDB server
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');

        // Select the database
        database = client.db('shop');

        if (!database) {
            console.log('Database not connected');
        } else {
            console.log('Database connected');
        }

        // Perform aggregation query to lookup product details
        const orderdetails = await database.collection('product_order').aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_ids',   // Use 'localField' instead of 'local'
                    foreignField: '_id',
                    as: 'productItems'
                }
            }
        ]).toArray();

        // Log the results
        console.log(orderdetails);

        // Optionally, close the connection after the operation
        //await client.close(); // Close the database connection
    } catch (error) {
        console.error('Error connecting to the database or fetching data:', error);
    }
})();
