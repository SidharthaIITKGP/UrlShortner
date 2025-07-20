const express = require('express');
const path = require('path');
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const { connect } = require('http2');
const URL= require('./models/url');
const app = express();
const port = 8001;
const staticRoute = require('./routes/staticRouter');
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
const userRoute = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use("/url", urlRoute)
app.use("/", staticRoute);
app.use("/user", userRoute);


app.get("/test" , async(req, res) => {
    const allUrls = await URL.find({});
    return res.render("home" , {
        urls: allUrls,
    })

});

app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push : {visitHistory :{timestamp : Date.now()},},});
    res.redirect(entry.redirectURL);
});



app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
