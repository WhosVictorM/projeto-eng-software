
const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name."]
        },
        price: {
            type: Number,
            required: [true, "Please enter the product price."],
            default: 0
        },
        quantity: {
            type: Number,
            required: [true],
            default: 0
        },
        description: {
            type: String,
            required: [false]
        },
        orderDate: {
            type: Date,
            required: [true],
            default: Date.now
        },
        validity: {
            type: Date,
            required: [false]
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product