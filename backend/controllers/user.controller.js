const User = require("../modules/user.modules")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists." });
        }

        // Criar um novo objeto de usuário com a senha criptografada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "E-mail doesn't match!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password doesn't match!" });
        }

        const jwtToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({ message: `Welcome back! ${user.username}`, token: jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updatePassword = async (req, res) => {

    try {
        const { id } = req.params

        const user = await User.findByIdAndUpdate(id, req.body)

        if(!user) {
            return res.status(404).json({message: "Product not found."})
        }

        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)

    } catch (error) {
        req.status(500).json({message: error.message})
    }
}