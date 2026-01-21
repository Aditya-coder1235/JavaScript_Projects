const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.signupUser = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({ name, email, password: hashPassword, role });

        await newUser.save()

        res.status(200).json({ message: "User registed successfully" });

    } catch (error) {
        res.status(400).json({ message: 'Error during Signup' })
    }
}


exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 48 * 60 * 60 * 1000
        }
        )

        res.status(200).json({ message:"Login successfully", token, user });


    } catch (error) {
        res.status(400).json({ message: 'Error during Login' })
    }
}


exports.logoutUser = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 48 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "user Logout successfully"});

    } catch (error) {
        res.status(400).json({ message: 'Error during Logout' })
    }
}