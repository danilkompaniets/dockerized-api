import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const {username, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 12);

    try {
        const newUser = await User.create({
            username,
            password: hashedPass
        });
        req.session.user = newUser;
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: "error"
        })
    }
}

export const signin = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            res.status(201).json({
                status: "success",
                data: {
                    user
                }
            });
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Invalid Credentials'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: "error"
        })
    }
}

