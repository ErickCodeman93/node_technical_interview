const AuthController = require( './AuthController' );
const GetUserController = require( './GetUserController' );

module.exports = {
	...AuthController,
	...GetUserController,
}