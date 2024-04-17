const express = require('express');
const router = express.Router();
const mp_service = require('../services/mp_service');

/* GET default - show All */
router.get('/', async function(req, res, next) {
    try {
        res.json(await mp_service.showAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting results `, err.message);
        next(err);
    }
});

/* POST - FIND TREASURE BOX DISTANCE
Find treasure boxes within 1km/10 (km) with the following input
1. Latitude: 14.552036595352455
2. Longitude: 121.01696118771324
3. Distance: 1 or 10 (km)

    formula: 
    Given that 6371 is Earth radius in km.
    6371* acos( cos(radians(lat1))* cos(rasdians(lat2))* cos(radians(long2) - radians(long1)) + sin (radians (lat1)) * sin (radians(lat2)))

    source: https://www.mrexcel.com/board/threads/calculating-distance-between-two-latitude-longitude-points.202255/

*/
router.post('/find-treasure-box-within-radius', async function(req, res, next) {
    try {
        res.json(await mp_service.findTreasureBoxWithinRadius(req.body));
    } catch (err) {
        console.error(`Error while finding treasure box within radius of 1 or 10 km.`, err.message);
        next(err);
    }
});

router.post('/find-treasure-box-with-prize-value', async function(req, res, next) {
    try {
        res.json(await mp_service.findTreasureBoxWithPrizeValue(req.body));
    } catch (err) {
        console.error(`Error while finding treasure box with prize value of $10`, err.message);
        next(err);
    }
});

router.post('/find-closest-treasure-box', async function(req, res, next) {
    try {
        res.json(await mp_service.findClosestTreasureBox(req.body));
    } catch (err) {
        console.error(`Error while finding closest treasure box`, err.message);
        next(err);
    }
});
module.exports = router;