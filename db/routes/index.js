const express = require('express');
const {lupaController,pupaController}=require('../controllers')
const cors = require('cors')



const router = express.Router();

router.get('/lupa/count', lupaController.findCount)
router.get('/pupa/count', pupaController.findCount)
router.get('/lupa/:limit/:ofset', lupaController.findLimit)
router.get('/pupa/:limit/:ofset', pupaController.findLimit)
router.post('/pupa/add/', pupaController.add)
router.put('/pupa/edit/:id', pupaController.edit)
router.delete('/pupa/delete/:id', pupaController.delete)


module.exports = router;

