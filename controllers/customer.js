import jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import user from '../models/auth.js'
import data from '../models/database.js'


export const signup = async (req,res) => {
    const { name, email, password } = req.body ;
    try{
        const existinguser = await user.findOne({email})
        if( existinguser){
            return res.status(404).json({message: "User Already exist."})
        }
        const hasedPassword = await bcrypt.hash(password,12)
        const newUser = await user.create({name,email,password: hasedPassword})
        const token = jwt.sign({email: newUser.email, id: newUser._id}, "test", { expiresIn : '1h'});
        res.status(200).json({result: newUser, token})
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body ;
    try {
        const existinguser = await user.findOne({email})
        if( !existinguser){
            return res.status(404).json({message: "User Doesn't Already."})
        }
        const isPasswordCrct = await bcrypt.compare(password, existinguser.password)
        if( !isPasswordCrct){
            return res.status(400).json({message: "User Doesn't Already."})
        }
        const newUser = await user.create({email,password: hasedPassword})
        const token = jwt.sign({email: newUser.email, id: newUser._id}, "test", { expiresIn : '1h'});
        res.status(200).json({result: newUser, token})
    } catch (error) {
        res.status(500).json("Something went wrong...") 
    }
}

export const order = async (req,res) => {
    const user = req.user
    const {id:taskID} = req.params
    const task = await data.findOneAndUpdate(
        {_id:taskID},
        req.body,
        {
            orderedusers:[{
                userordered: user.name,
                userId: user._id,
            }] 
        }
    )
    
}