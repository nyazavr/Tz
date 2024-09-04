
class PupaRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    findCount(){
        return this.db.one('SELECT count(*) FROM pupa')
    }
    add(lupaId,age,firstname,salary,newdate) {
        return  this.db.result('INSERT INTO pupa (lupaid,age,firstname,salary,newdate) VALUES ($1,$2,$3,$4,$5)', [+lupaId, +age, firstname, +salary, newdate])
    }
    delete(id) {
        return this.db.result('DELETE FROM pupa WHERE id = $1', +id);
    }
    edit(id,lupaId,age,firstname,salary,newdate) {
        console.log([+lupaId, +age, firstname, +salary, newdate, +id])
        return this.db.result('UPDATE pupa SET lupaid=$1,age=$2,firstname=$3,salary=$4,newdate=$5 WHERE id = $6;', [+lupaId, +age, firstname, +salary, newdate, +id])
    }
    findById(id) {
        return this.db.oneOrNone('SELECT * FROM pupa WHERE id = $1', +id);
    }
    all() {
        return this.db.any('SELECT * FROM pupa');
    }
    findLimit(limit,ofset) {
        return this.db.any('SELECT * FROM pupa LIMIT $1 OFFSET $2', [limit, ofset]);
    }
}
module.exports = PupaRepository;