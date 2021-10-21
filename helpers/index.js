const encryptPWS = require( './encryptPWS' );
const generateJWT = require( './generateJWT' );
const saveRecords = require( './saveRecords');

module.exports = {
	...encryptPWS,
	...generateJWT,
	...saveRecords,
}