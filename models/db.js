
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
/*
Setting DB name, address, port.
Creating a DB connection instance, exporting the instance through "module.exports".
It can be "require" to doing I/O from DB.
*/
module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});