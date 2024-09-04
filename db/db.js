const pgPromise = require('pg-promise'); // pg-promise core library
const {lupa,pupa} = require('./models');
const initOptions = {
    extend(obj) {
        obj.lupa = new lupa(obj, pgp);
        obj.pupa = new pupa(obj, pgp);
    }
};
const pgp = pgPromise(initOptions);

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'postgres',
    password: 'furofa20',

});
module.exports = {
    pgp, db
}