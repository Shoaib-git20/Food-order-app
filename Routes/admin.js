import express from "express";
import data from '../models/database.js'
const router = express.Router();

router.get('/viewOrders', async (req,res)=>{
    const task= await data.find({orderedusers}) 
    res.status(201).json({task})
})

router.post('/create',async (req,res)=>{
    const task = await data.create(req.body)
    res.status(201).json({task})
})

router.patch('/update',async (req,res)=>{
    const {id:tasId} = req.params
    const task = await data.findOneAndUpdate({_id:taskId},req.body)
    res.status(201)
})

router.delete('/delete',async (req,res)=>{
    const {id:tasId} = req.params
    const task = await data.findOneAndDelete({_id:taskId},req.body)
    res.status(200).json({task})
})

export default router