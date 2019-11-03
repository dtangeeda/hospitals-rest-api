const express = require( 'express' );
const path = require( 'path' );
const { getPlace, getPrices } = require( './lib/mongo' );
const pub = path.join( global.__basedir, 'client', 'build' );

   /******************
     * This is Router file to support the REST API via server.js that invokes the mongo.js *
     ******************/

module.exports = {
  createRoutes: app => {

    /******************
     * default route  *
     ******************/
    app.use( express.static( pub ) );
    app.use(express.json());
    
    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    });

    app.get( '/', ( req, res ) => res.sendFile( path.join( pub, 'index.html' ) ) );
    
    /******************
     * service routes *
     ******************/

     /*GET the Place Data */
    app.get( '/api/getPlace/:placeID', ( req, res ) => {
      const placeName = req.params.placeID;
      if ( placeName ) {
        getPlace( placeName ).then( report => {
          res.send( report );
          console.log( `Getting the Place data for ${placeName}` );
        } ).catch( e => res.send( "Got an Error" ) );
      } else {
        res.send( 'Error: Missing placeID' );
      }
    } );

    /*GET the Prices for a place */
    app.get( '/api/getPrices/:placeID', ( req, res ) => {
      const placeName = req.params.placeID;
      if ( placeName ) {
        getPrices( placeName ).then( report => {
          res.send( report );
          console.log( `Getting the Prices Data for ${placeName}` );
         } ).catch( e => res.send( e ) );
      } else {
        res.send( 'Error: Missing placeID' );
      }
    } );
  }
};
