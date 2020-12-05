const mongoose = require('mongoose')

const greenhouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 255
    },
    temperature: {
        type: Number,
        required: true
    }
}, { timestamps: mongoose.timestamps })

module.exports = mongoose.model('Greenhouse', greenhouseSchema)
