const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { login, signIn } = require( '../controllers' );
const { validateFields } = require( '../middlewares' );

const router = Router();

router.post( '/login', [
	check( 'email', 'El email es obligatorio' ).isEmail(),
	check( 'password', 'El password es obligatorio' ).not().isEmpty(),
	validateFields
], login );

router.post( '/signIn', [
	check( 'email', 'El email es obligatorio' ).isEmail(),
	check( 'password', 'El password es obligatorio' ).not().isEmpty(),
	check( 'role', 'El rol es obligatorio' ).not().isEmpty(),
	validateFields
], signIn );

module.exports = router;