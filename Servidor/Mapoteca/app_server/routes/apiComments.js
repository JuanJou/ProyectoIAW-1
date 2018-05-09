var express = require('express');
var router = express.Router();
const controllerCmt=require('../controllers/comentarios');
const middleware=require('../auth/middleware');

router.post('/save',middleware,controllerCmt.save);
router.post('/get',controllerCmt.get);

module.exports=router;
