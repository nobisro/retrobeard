const mongoose = require('mongoose');
const { Retro, Category, Board } = require('./models')

//@TODO move to process.env
// const uri = `mongodb://127.0.0.1:27017/retroboard`

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds261430.mlab.com:61430/retroboard`

const connectDb = () => {
    return mongoose.connect(uri)
}

const models = { Retro, Category, Board }

module.exports = {
    connectDb,
    models
}