const { Router } = require( 'express' );

const { 
    validateJWT,
    adminRole,
    permissionRole,
 } = require( '../middlewares' );

const { getAllUsers } = require( '../controllers' );


const router = Router();

router.get( '/', [ 
    validateJWT,
    permissionRole( [ 'ADMIN_ROLE' ] ),
    adminRole,
], getAllUsers );


module.exports = router;
