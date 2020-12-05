const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const greenhouseRoutes = require('./routes/greenhouseRoutes')


const app = express()
dotenv.config()

app.use(express.json())
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'))
app.use(cors())
app.use('/api', greenhouseRoutes)


const MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_CONNECTION, MONGOOSE_OPTIONS, () => {
    console.log('Connected to MongoDB database')
})


const PORT = process.env.PORT || 3232
app.listen(PORT, () => console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`))