const mongoose = require('mongoose')

const greenhouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 255
    },
}, { timestamps: mongoose.timestamps })

module.exports = mongoose.model('Greenhouse', greenhouseSchema)