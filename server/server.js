const path = require('path')
const express = require('express');
// const cors = require('cors')
const bodyParser = require('body-parser')
// const boardRouter = require('./board')
const { models, connectDb } = require('../src/models/index')
const ObjectId = require('mongoose').Types.ObjectId;
const { Retro, Category, Board } = models;
const app = express();
const port = process.env.PORT || 1337;

// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../dist')))
// app.use('/b*', boardRouter)

// app.get('*', (req, res) => {
//     res.sendFile('./dist.index.html')
// })

app.get('/*', (req, res) => {
    // res.sendFile(path.join(__dirname, '/../dist/index.html'), err => {
    //     if (err) {
    //         res.status(500).send(err)
    //     }
    // })
    res.sendFile('index.html', { root: __dirname + '/../dist' })
})


app.get('/api/test/:id', (req, res) => {
    const id = req.params.id
    console.log('test req received')
    res.send(`yo: ${id}`)
})

app.get('/api/redirect', (req, res) => {
    const id = Math.floor(Math.random() * 100)
    res.redirect(`/api/test/${id}`)
})



// app.get('/', (req, res) => {
//     const p = express.static(path.join(__dirname, 'dist'))
//     console.log(path.join(__dirname, 'dist'))
//     // res.send(p.toString())
// })

// app.get('/b/:id', (req, res) => {
//     const id = req.params.id
//     res.send(`The id is: ${id}`)
// })

app.post('/api/edit', async (req, res) => {
    const { _id, board_id, category_id, title, description } = req.body
    const board = await Board.findOne({ "_id": ObjectId(board_id) });
    board.categories.forEach((category, catInd) => {
        category.retros.forEach((retro, retInd) => {
            if (_id == retro._id) {
                const editedRetro = new Retro({
                    board_id: board_id,
                    category_id: category_id,
                    title: title,
                    description: description
                })
                board.categories[catInd].retros.splice(retInd, 1, editedRetro)
            }
        })
    })
    try {
        const edited = await board.save();
        res.send(edited)
    } catch (e) {
        console.log('error editing:', JSON.stringify(e))
    }
})

app.post('/api/save', async (req, res) => {
    const { board_id, category_id, title, description } = req.body
    console.log('boardid:', board_id)
    console.log('category_id:', category_id)
    console.log('title:', title)
    console.log('description:', description)

    if (board_id && category_id && title && description) {
        const retro = new Retro({
            board_id: board_id,
            category_id: category_id,
            title: title,
            description: description
        })
        const board = await Board.findOne({ "_id": ObjectId(board_id) });

        board.categories.find(category => category._id == category_id).retros.push(retro)
        try {
            const saved = await board.save();
            console.log('saved:', saved)
            res.send(saved)
        } catch (e) {
            console.log('error saving', JSON.stringify(e))
        }
    }
})

app.post('/api/delete', async (req, res) => {
    const { board_id, category_id, _id } = req.body
    if (board_id && category_id && _id) {
        try {
            const board = await Board.findOne({ "_id": ObjectId(board_id) })
            board.categories.forEach((category, cInd) => {
                if (category._id == category_id) {
                    category.retros.forEach((retro, rInd) => {
                        if (retro._id == _id) {
                            board.categories[cInd].retros.splice(rInd, 1)
                        }
                    })
                }

            })

            const deleted = await board.save()
            res.send(deleted)
        } catch (e) {
            console.log('error deleting:', JSON.stringify(e))
        }
    }

})


app.post('/api/create', async (req, res) => {
    const categories = Object.values(req.body).map(category => new Category({
        title: category
    }))
    const board = new Board({
        categories: categories,
    })


    try {
        const created = await board.save();
        const id = created._id;
        console.log('created', id)
        // res.redirect(`/b/${id}`)
        res.send({ board_id: id })
    } catch (e) {
        console.log('error creating:', JSON.stringify(e))
    }

})

app.post('/api/load', async (req, res) => {
    const { board_id } = req.body;
    console.log('req received');
    try {
        if (board_id) {
            const board = await Board.findOne({ "_id": ObjectId(board_id) })
            res.send(board)
        }
    } catch (e) {
        res.send(new Error('could not load'))
        console.log('error loading:', JSON.stringify(e))
    }
})

// app.use('/b/:id', async (req, res) => {
//     const board_id = req.params.id
//     console.log('res', res)
//     const p = path.join(__dirname, 'dist');
//     const options = {
//         root: path.join(__dirname, 'dist'),
//         headers: {
//             'x-timestamp': Date.now(),
//             'x-sent': true
//         }
//     }
//     try {
//         if (board_id) {
//             const board = await Board.findOne({ "_id": ObjectId(board_id) })
//             console.log('board', board)
//             res.send(board)
//         }
//     } catch (e) {
//         res.send(new Error('could not load'))
//         console.log('error loading:', e.toString())
//     }
// })

connectDb().then(async () => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
