const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const productsRoute = require('./routes/product.route.js')
const usersRoute = require('./routes/user.route.js')
const app = express()
require('dotenv').config()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/products", productsRoute)

app.use("/api/auth", usersRoute)

mongoose.connect(process.env.URL_DB).then(() =>{
    console.log('MongoDB Connected.');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}.`);
    })
}).catch(() => {
    console.log('Connection Fail.');
})

