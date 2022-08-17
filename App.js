const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const __basedir =  path.resolve()


require('dotenv').config()

const whitelist = ['http://localhost8080']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('storage'))
app.use('/img', express.static(__basedir + './storage/upload'))

const db = require('./src/models')
const seed = require('./src/models/seeds')

db.sequelize
    .sync()
    .then(() => {
        // seed.userSeed()
        // seed.categorySeed()
        console.log(`database connected successfully`)
    })
    .catch((err) => {
        console.error(`database connection failed`, err.message)
    })

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running...'
    })
})

require('./src/routes/auth.route')(app)
require('./src/routes/profile.route')(app)
require('./src/routes/product.route')(app)
require('./src/routes/upload.route')(app)
require('./src/routes/ads.route')(app)

const Port = process.env.APP_PORT || 5000;

app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
})
