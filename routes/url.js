const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL, handleGetAnalystics}= require('../controllers/url');
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalystics);
    
module.exports = router;
