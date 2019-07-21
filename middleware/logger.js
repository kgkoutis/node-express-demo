const moment = require('moment')

const logger = (req, res, next) =>{
    // req.protocol --> e.g. https
    // req.get('host') --> e.g. localhost
    // req.originalUrl --> e.g. /api/members
    // moment().format() --> e.g 2019-20-21T20:46:27-05:00
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;
