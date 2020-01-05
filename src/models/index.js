const mongoose = require('mongoose');
const { Retro, Category, Board } = require('./models')

//@TODO move to process.env
const url = 'mongodb://127.0.0.1:27017/retroboard'

const connectDb = () => {
    return mongoose.connect(url || process.env.DATABASE_URL)
}

const models = { Retro, Category, Board }

module.exports = {
    connectDb,
    models
}