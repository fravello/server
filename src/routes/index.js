const express = require('express');
const router = express.Router();

const model = require('../models/mqtt_dash');

router.get('/', async (req, res) => {

    const mqtt_dash = await model.find().sort({$natural:-1}).limit(20);

    res.render('index',{
        mqtt_dash
    });


});

module.exports = router;