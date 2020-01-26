const path = require('path')
const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log('req params:', req.body)
    res.sendFile(path.join(__dirname, '/../dist'))
})

router.use(express.static(path.join(__dirname, '/../dist')))

module.exports = router;