const {db} = require('../db.js');

const pupa = {
    async findCount(req,res){
        try {
            const data = await db.pupa.findCount();
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
            const data = await db.pupa.findLimit(req.params.limit,req.params.ofset);
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
    async add(req,res){
        try {
            const checkLupaId= await db.lupa.findId(req.body.LupaId)
            if(checkLupaId[0].id){
                const data = await db.pupa.add(req.body.LupaId, req.body.age, req.body.firstName, req.body.salary, req.body.newDate )
                res.json({
                    success: true,
                    data
                });
            }else{
                throw new Error('no lupaId user')
            }
            
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    },
    async edit(req,res){
        try {
            const checkLupaId= await db.lupa.findId(req.body.LupaId)
            if(checkLupaId[0].id){
                const data = await db.pupa.edit(req.params.id,req.body.LupaId, req.body.age, req.body.firstName, req.body.salary, req.body.newDate )
                res.json({
                    success: true,
                    data
                });
            }else{
                throw new Error('no lupaId user')
            }
            
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    },
    async delete(req,res){
        try {
            const data = await db.pupa.delete(req.params.id)
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
module.exports=pupa