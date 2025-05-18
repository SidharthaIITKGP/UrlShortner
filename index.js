const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const { connect } = require('http2');
const URL= require('./models/url');
const app = express();
const port = 8001;

app.use(express.json());

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use("/url", urlRoute)

app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push : {visitHistory :{timestamp : Date.now()},},});
    res.redirect(entry.redirectURL);
});



app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
