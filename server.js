const { models, connectDb } = require('./src/models/index')
const express = require('express');
const bodyParser = require('body-parser')
const { Retro, Category, Board } = models;
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/retros', async (req, res) => {
    const all = await Retro.find({})
    res.send(all)
})

app.post('/api/create', async (req, res) => {
    const categories = Object.values(req.body).map(category => new Category({
        title: category
    })
    )
    const board = new Board({
        categories: categories
    })

    console.log('board:', board)

    try {
        const created = await board.save();
        console.log('created:', created)
        res.send(created)
    } catch (e) {
        console.log('error creating:', JSON.stringify(e))
    }

})

app.post('/api/save', async (req, res) => {
    const { catId, title, description } = req.body
    if (catId && title && description) {
        const retro = new Retro({
            category: catId,
            title: title,
            description: description
        })
        try {
            const saved = await retro.save();
            res.send(saved)
        } catch (e) {
            console.log("error:", JSON.stringify(e))
        }
    }

})

connectDb().then(async () => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
