const mongoose = require('mongoose')
const generator = require('generate-password')

const UserSchema = mongoose.Schema( 
    {
        username: {
            type: String,
            required: [true, 'Please enter a Username.'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please enter a Password.']

        },
        email: {
            type: String,
            required: [true, 'Please enter an E-mail.'],
            unique: true
        }
    }
)


const User = mongoose.model("User", UserSchema)

module.exports = User