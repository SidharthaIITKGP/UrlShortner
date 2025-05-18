const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL, handleGetAnalystics}= require('../controllers/url');
router.post('/', handleGenerateNewShortURL);
router.get('/analyconst express = require('express');
const router = express.Router();
const urlController = require('../controllers/url');

router.post('/', urlController.handleGenerateNewShortURL);
router.get('/analytics/:shortId', urlController.handleGetAnalystics);

module.exports = router;tics/:shortId', handleGetAnalystics);
    
module.exports = router;
