if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const environment = process.env.DATABASE_ENV || 'development';
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);