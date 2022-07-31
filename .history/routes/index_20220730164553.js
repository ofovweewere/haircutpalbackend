/* eslint-disable linebreak-style */
const express = require('express');
const apicache = require('apicache');
const indexController = require('../controllers/indexController');

const router = express.Router();
// Step 5 Sets up cache for requests
const cache = apicache.middleware;

// renders the home page
// router.get('/ping', cache('60 minutes'), indexController.apiPing);
// router.get('/posts', cache('60 minutes'), indexController.getPosts);

router.get('/ping', cache('60 minutes'), indexController.apiPing);
router.get('/posts', cache('60 minutes'), indexController.getPosts);
router.get('/warehouses', indexController.warehouses);
module.exports = router;
