
class LupaRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    findCount(){
        return this.db.one('SELECT count(*) FROM lupa')
    }

    findLimit(limit,ofset) {
        return this.db.any('SELECT * FROM lupa LIMIT $1 OFFSET $2', [limit, ofset]);
    }
    findId(id) {
        return this.db.any('SELECT (id) FROM lupa where id=$1', +id);
    }
}

module.exports = LupaRepository;