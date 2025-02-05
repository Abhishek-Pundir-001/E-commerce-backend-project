import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"

const signup = async (req, res) => {
    const { name, email, password, userId, userType } = req.body
    if (!name || !email || !password, !userId, !userType) {
        return res.status(400).json({
            success: false,
            meassage: 'All fields are mandatory'
        })

    }

    try {
        const user = await userModel.create(req.body);
        console.log(password)
        user.password = undefined
        return res.status(201).json({
            success: true,
            message: 'user registered successfully',
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.meassage
        })
    }


}
export {
    signup
}