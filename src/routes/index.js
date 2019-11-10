const express = require('express');
const router = express.Router();

const model = require('../models/ttn_msg');

router.get('/', async (req, res) => {

    const ttn_msg = await model.find().sort({$natural:-1}).limit(20);

    res.render('index',{
        ttn_msg
    });


});

module.exports = router;