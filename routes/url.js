const express = require('express');
const router = express.Router();
const { handleGenerateNewShortURL, handleGetAnalystics } = require('../controllers/url');

// Route to generate a new short URL
router.post('/', handleGenerateNewShortURL);

// Route to get analytics for a given shortId
router.get('/analytics/:shortId', handleGetAnalystics);

module.exports = router;
