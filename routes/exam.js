const Exam = require('../models/examModel')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    try {
        let data = await Exam.create(req.body)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.get('/', async (req, res, next) => {
    try {
        let data = await Exam.find()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router
