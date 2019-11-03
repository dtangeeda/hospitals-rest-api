const { MongoClient } = require( 'mongodb' );
require('dotenv/config');

const uri = process.env.DB_CONNECTION;

   /******************
     * This is Mongo DB functions to support the REST API via router.js *
     ******************/

module.exports = {
  getPlace: async placeId => {
    const client = new MongoClient( uri, { useNewUrlParser: true }, { useUnifiedTopology: true } );
      return new Promise( ( resolve, reject ) => {
        const query = { id : placeId }
        client.connect( async err => {
          let db = client.db( 'hospitalPrices' );
          await db.collection( 'places' ).find( query ).toArray((err, result) =>{
            if ( err ) {
              throw( err );
            }
            resolve(result);
            client.close();
          } ); 
        } );
    } );
  },

  getPrices: async placeId => {
    const client = new MongoClient( uri, { useNewUrlParser: true } );
      return new Promise( ( resolve, reject ) => {
        const query = { place : placeId }
        client.connect( async err => {
          let db = client.db( 'hospitalPrices' );
          db.collection('scrape_log').find(query).limit(1).sort({$natural:-1}).toArray((err, result) =>{
            if ( err ) {
              throw( err );
            }
            let state_name = result[0].collection;
            let scrape_id = result[0].id;
            const _id_query = {scrapeId : scrape_id};
            db.collection( state_name ).find( _id_query ).toArray((err, result) =>{
              if ( err ) {
                throw( err );
              }
              resolve(result);
              client.close();
            });
          });
        } );
      } );
  },

  getTopPrices: async (placeId, rank) => {
    const client = new MongoClient( uri, { useNewUrlParser: true } );
      return new Promise( ( resolve, reject ) => {
        const query = { place : placeId }
        client.connect( async err => {
          let db = client.db( 'hospitalPrices' );
          db.collection('scrape_log').find(query).limit(1).sort({$natural:-1}).toArray((err, result) =>{
            if ( err ) {
              throw( err );
            }
            let state_name = result[0].collection;
            let scrape_id = result[0].id;
            const _id_query = {scrapeId : scrape_id};
            db.collection( state_name ).find( _id_query ).toArray((err, result) =>{
              if ( err ) {
                throw( err );
              }
              resolve(result);
              client.close();
            });
          });
        } );
      } );
  }
};