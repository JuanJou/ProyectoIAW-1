var express = require('express');
var router = express.Router();

const cntrlLocales=require("../controllers/gestionLocales")

/* GET home page. */
router.get('/',cntrlLocales.get);
module.exports = router;
