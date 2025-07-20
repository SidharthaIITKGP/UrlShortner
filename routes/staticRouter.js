const express = require('express');
const URL = require('../models/url'); // Make sure the model is correctly defined and exported
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allurls = await URL.find({}); // Await the Promise
        return res.render('home', {
            urls: allurls, // Now this contains actual documents
        });
    } catch (err) {
        console.error('Error fetching URLs:', err);
        return res.status(500).send('Internal Server Error');
    }
});
router.get('/signup', (req, res) => {
    return res.render('signup');
});

module.exports = router;
