const path = require('path')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { models, connectDb } = require('./src/models/index')
const ObjectId = require('mongoose').Types.ObjectId;
const { Retro, Category, Board, Team } = models;
const app = express();
const port = process.env.PORT || 1337;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')))

app.all('/b/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
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

app.get('/api/teams', async (req, res) => {
    const teams = await Team.find({});
    res.send(teams);
})

app.post('/api/teams', async (req, res) => {
    const name = req.params.name
    const team = new Team(name)
    const saved = await team.save();
    res.send(saved);
})

app.post('/api/edit_team', async (req, res) => {
    const { board_id, team } = req.body;

    // This occurs when user selects their team prior to loading a board
    if (team === null) {
        console.log('team is null')
        res.send(200)
        return;
    }

    const board = await Board.findOne({ "_id": ObjectId(board_id) });
    board.team = team;
    const saved = await board.save()
    res.send(JSON.stringify(saved.team))
})

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
    const { categories, team } = req.body;

    const cats = Object.values(categories).map(category => new Category({
        title: category
    }))
    const board = new Board({
        categories: cats,
        team: team,
        created: new Date().getTime()
    })

    try {
        const created = await board.save();
        res.send(JSON.stringify(created._id))
    } catch (e) {
        console.log('error creating:', JSON.stringify(e))
    }
})

app.post('/api/load', async (req, res) => {
    const { board_id } = req.body;
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

app.post('/api/load_adjacent', async (req, res) => {
    const { team, created, direction } = req.body;
    const boards = await Board.find({ "team": team })

    //sort boards from earliest to newest
    boards.sort((a, b) => {
        return a.created - b.created
    })

    console.log(`all boards from: ${team}`, boards)
    console.log('direction:', direction)

    const i = boards.findIndex(board => board.created === created)
    console.log('index of board:', i)

    if (direction === 'BACK') {
        const prev = i - 1;
        if (prev >= 0) {
            res.send(boards[prev])
        }
    } else if (direction === 'FORWARD') {
        const next = i + 1;
        if (next <= boards.length - 1) {
            res.send(boards[next])
        }
    }
})

connectDb().then(async () => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
