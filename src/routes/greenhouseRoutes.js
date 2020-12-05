const express = require('express')

const {
    getAllGreenhouses,
    getGreenhouse,
    createGreenhouse,
    deleteGreenhouse
} = require('../controllers/greenhouseController')

const router = express.Router();

router.route('/all').get(getAllGreenhouses)
router.route('/:name').get(getGreenhouse)
router.route('/').post(createGreenhouse)
router.route('/:name').delete(deleteGreenhouse)

module.exports = router