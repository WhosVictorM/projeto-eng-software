const express = require('express')
const mongoose = require('mongoose')
const Product = require('./modules/product.modules.js')
const productsRoute = require('./routes/product.route.js')
const app = express()
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/products", productsRoute)

mongoose.connect(process.env.URL_DB).then(() =>{
    console.log('MongoDB Connected.');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}.`);
    })
}).catch(() => {
    console.log('Connection Fail.');
})

