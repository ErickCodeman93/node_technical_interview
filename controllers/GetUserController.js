const { response, request } = require( 'express' );
const { leerDB } = require('../helpers/saveRecords');

const getAllUsers = ( req = request, res = response ) => {

	let users = leerDB();
	res.json({
		msg: 'ok',
		users,
	});

} //end function

module.exports = {
	getAllUsers
}