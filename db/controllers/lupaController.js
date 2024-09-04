const {db} = require('../db.js');

const lupa = {
    async findCount(req,res){
        try {
            const data = await db.lupa.findCount();
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    },
    async findLimit(req,res){
        try {
            const data = await db.lupa.findLimit(req.params.limit,req.params.ofset);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    }
    
}
module.exports=lupa