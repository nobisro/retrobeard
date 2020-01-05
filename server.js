const { models, connectDb } = require('./src/models/index')
const express = require('express');
const bodyParser = require('body-parser')
const { Retro } = models;
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/retros', async (req, res) => {
    const all = await Retro.find({})
    console.log('a:', all)
    res.send(all)
})

app.post('/api/save', async (req, res) => {
    const { catId, title, description } = req.body
    if (catId && title && description) {
        const retro = new Retro({
            category: catId,
            title: title,
            description: description
        })

        console.log('retro:', retro)

        try {
            const saved = await retro.save();
            console.log('saved:', saved)
            res.send(saved)
        } catch (e) {
            console.log("error:", JSON.stringify(e))
        }
    }

})


connectDb().then(async () => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
