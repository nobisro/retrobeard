const mongoose = require('mongoose');

const RetroSchema = new mongoose.Schema({
    category: {
        type: Number
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
        type: [RetroSchema],
        default: undefined
    }
})

const BoardSchema = new mongoose.Schema({
    categories: {
        type: [CategorySchema],
        default: undefined
    }
})


const Retro = mongoose.model('Retro', RetroSchema)

const Category = mongoose.model('Category', CategorySchema)

const Board = mongoose.model('User', BoardSchema)


module.exports = {
    Retro, Category, Board
}