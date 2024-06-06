const mongoose = require('mongoose')
const generator = require('generate-password')

const password = generator.generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true
});

const UserSchema = mongoose.Schema( 
    {
        username: {
            type: String,
            required: [true, 'Please enter a Username.']
        },
        password: {
            type: String,
            required: [true, 'Please enter a Password.'],
            default: password

        },
        email: {
            type: String,
            required: [true, 'Please enter an E-mail.']
        }
    }
)


const User = mongoose.model("User", UserSchema)

module.exports = User