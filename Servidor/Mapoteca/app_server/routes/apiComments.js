var express = require('express');
var router = express.Router();
const controllerCmt=require('../controllers/comentarios');
const middleware=require('../auth/middleware');

router.post('/save',middleware,controllerCmt.save);
router.get('/get:name',controllerCmt.get);//Cambiar por get

module.exports=router;
