const express = require('express');
const router = express.Router();


/*
    Handlers
*/
const addMission = require('./add-mission');
const updateMission = require('./edit-mission');

/*
    Routes
*/

router.post('/create', addMission);
router.post('/update', updateMission);




module.exports = router;
