const mongoose = require('mongoose');

const RetroSchema = new mongoose.Schema({
    board_id: {
        type: String
    },
    category_id: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const CategorySchema = new mongoose.Schema({
    title: {
        type: String
    },
    retros: {
        type: [RetroSchema]
    }
})

const BoardSchema = new mongoose.Schema({
    categories: {
        type: [CategorySchema],
        default: undefined
    }
})

BoardSchema.statics.findAndModify = (query, sort, doc, options, callback) => {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};


const Retro = mongoose.model('Retro', RetroSchema)

const Category = mongoose.model('Category', CategorySchema)

const Board = mongoose.model('User', BoardSchema)


module.exports = {
    Retro, Category, Board
}