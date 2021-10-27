const express = require( 'express' );
const cors = require( 'cors' );

const { 
	authRoutes,
	usersApiRoutes,
 } = require( '../../routers' );

class Server {

	constructor() {

		this.app = express();
		this.port = process.env.PORT;
		this.routesPath = { 
			users : '/api/users',
			authPath: '/api/auth',
		};

		// Middlewares
		this.middlewares();

		//Routes
		this.routes();
	} //end constructor

	middlewares(){

		// Cors
		this.app.use( cors() );

		// Lectura y parseo del Body
		this.app.use( express.json() );

		// Directorio publico
		this.app.use( express.static( 'public' ) )
		.get('/', function ( req, res ) {
			console.log('Registro');
			res
				.status( 200 )
				.set( { 'content-type': 'text/html; charset=utf-8;' } )
				.sendfile('public/index.html' );
		})
		.get('/home', function ( req, res ) {
			console.log('Home');
			res
				.status( 200 )
				.set( { 'content-type': 'text/html; charset=utf-8;' } )
				.sendfile('public/index.html' );
		})
		.get('/login', function ( req, res ) {
			console.log('');
			res
				.status( 200 )
				.set( { 'content-type': 'text/html; charset=utf-8;' } )
				.sendfile('public/index.html' );
		}); 
		
		
	} //end method

	routes(){
		this.app.use( this.routesPath.authPath, authRoutes );
		this.app.use( this.routesPath.users, usersApiRoutes );
	} //end method

	listen(){
		this.app.listen( this.port ,() => console.log( `Listen in port: ${ this.port }` ) );
	} //end method

} //end class

module.exports = Server;