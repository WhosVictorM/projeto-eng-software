const User = require("../modules/user.modules")


exports.getAllUsers = async (req, res) => {

    const user = await User.find()
    res.status(200).json(user)
}

exports.getUserById = async (req, res) => {

    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "User not found."})
    }
}

exports.insertUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateUserById = async (req, res) => {

    try {
        const { id } = req.params

        const user = await User.findByIdAndUpdate(id, req.body)

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }

        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)

    } catch (error) {
        req.status(500).json({message: error.message})
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndDelete(id)

        const usersGET = await User.find()

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }


        res.status(200).json(usersGET)

    } catch (error) {
        res.status(500).json({message: "Something unexpected ocurred"})
    }
}
