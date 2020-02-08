const mongoose = require('mongoose');
const { Retro, Category, Board, Team } = require('./models')

//@TODO move to process.env
const uri = `mongodb://127.0.0.1:27017/retroboard`

// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds261430.mlab.com:61430/retroboard`

const options = {
    useNewUrlParser: true,
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}

const connectDb = () => {
    return mongoose.connect(uri)
}

const models = { Retro, Category, Board, Team }

module.exports = {
    connectDb,
    models
}