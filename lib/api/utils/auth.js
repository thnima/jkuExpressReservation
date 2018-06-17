const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://thn.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://jku-reservation.com',
    issuer: "https://thn.eu.auth0.com/",
    algorithms: ['RS256']
});

module.exports = authCheck;