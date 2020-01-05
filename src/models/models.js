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
    id: {
        type: Number,
        unique: true,
    },
    retros: {
        type: [RetroSchema],
        default: undefined
    }
})

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    categories: {
        type: [CategorySchema],
        default: undefined
    }
})


const Retro = mongoose.model('Retro', RetroSchema)

const Category = mongoose.model('Category', CategorySchema)

const User = mongoose.model('User', UserSchema)


module.exports = {
    Retro, Category, User
}