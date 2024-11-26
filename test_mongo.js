require('dotenv').config();

// import mongo client
const { MongoClient } = require('mongodb');

// string connection
const uri = process.env.URI_MONGO

async function  testConnection() {
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log('Connessione Riuscita')
    } catch(error){
        console.error('Errore di Connssione a MongoDB:', error);
    } finally{
        await client.close();
    }

}

testConnection();