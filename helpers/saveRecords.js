const fs = require( 'fs' );
const path = require('path');

const archivo = path.join( __dirname, '../data/records.json' );

const saveDB = ( data ) => {
	fs.writeFileSync( archivo, JSON.stringify( data ) );
}

const leerDB = () => {

	if( ! fs.existsSync( archivo ) )
		return null;

	const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
	const data = JSON.parse( info );
	return data;

}

module.exports = {
	saveDB,
	leerDB,
}