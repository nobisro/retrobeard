const mongoose = require('mongoose');
const { Retro } = require('./models')

//@TODO move to process.env
const url = 'mongodb://127.0.0.1:27017/retroboard'

const connectDb = () => {
    return mongoose.connect(url || process.env.DATABASE_URL)
}

const models = { Retro }

// const index = {
//     models: models,
//     connectDb: connectDb
// }

module.exports = {
    connectDb,
    models
}
// export default index;

// export { connectDb }
// export default models;