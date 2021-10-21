const { request, response } = require("express");
const bcryptjs = require( 'bcryptjs' );

const { generarJWT, encryptPassword } = require( "../helpers" );
const { leerDB, saveDB } = require("../helpers/saveRecords");


const login = async ( req = request, res = response ) => {

	const { email, password } = req.body;

	try {
		
		let db = leerDB();

		let user = db.find( e => e.email === email.toLowerCase() );

		// Verificar si existe el email existe
		if( ! user )
			return res.status( 400 )
						.json( {
							msg: 'No existe el usuario'
						} );

		// Verificar el password
		const validPassword = bcryptjs.compareSync( password, user.password );

		if( ! validPassword ) 
			return res.status( 400 )
						.json( {
							msg: 'Email / Password no son correctos'
						} );

		// Generar el Json Web token
		const token = await generarJWT( user.email );

		delete user['password'];

		res.json({
			msg: 'login ok',
			user,
			token
		});

	} //end try 
	catch (error) {
		return res.status( 500 )
		.json({
			msg: 'Error',
			error
		});
	} //end catch

} //End function 

const signIn = async( req = request, res = response ) => {

	const { email, password, role } = req.body;

	try {

		let db = leerDB();

		let found = db.find( e => e.email === email.toLowerCase() );
		
		if( found )
			return res.status( 400 )
					.json({
						msg: 'Error',
						error: 'existing user'
					});
			 

		pws = encryptPassword( password );

		db.push( {
			ID: ( db.length + 1 ),
		 	email: email.toLowerCase(),
		 	password: pws,
		 	role
		} );

		saveDB( db );

		res.json({
			msg: 'success',
		});

	} //end try 
	catch (e) {
		return res.status( 500 )
		.json({
			msg: 'Error',
			error: e.message
		});
	} //end catch

} //end function

module.exports = {
	login,
	signIn
}