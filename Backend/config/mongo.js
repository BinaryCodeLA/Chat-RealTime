const moongose = require('mongoose');
const Promise = require('bluebird');
const config = require('./index');
const log = require('../log');

moongose.Promise = Promise; //plugin bluebird as moongose promise

//to export connection, set logging

const init = ()=> {
    connectMongo();
    moongose.connection.on('connected', ()=> log.log('mongo',`connected to db: "${config.mongo.host}" `));
    moongose.connection.on ('error', err => log.err('mongo','error', err.message || err));
}

//connect to mongo host, set tretry at initial fail
const connectMongo = () => {
    moongose.connect(config.mongo.host,config.mongo.options)
        .catch(err => {
            log.err('mongo', 'connection to db failed', err.message || err);
            setTimeout(connectMongo,2000);
        })
}

module.exports = init;