const express = require('express')
const mongoose = require('mongoose')
const productsRoute = require('./routes/product.route.js')
const usersRoute = require('./routes/user.route.js')
const app = express()
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/products", productsRoute)

app.use("/api/users", usersRoute)

mongoose.connect(process.env.URL_DB).then(() =>{
    console.log('MongoDB Connected.');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}.`);
    })
}).catch(() => {
    console.log('Connection Fail.');
})

