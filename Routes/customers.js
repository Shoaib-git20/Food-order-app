import express from "express";
import {signup, login, order} from '../controllers/customer.js'

const router = express.Router();

router.post('/signup', ()=>{signup})
router.post('/login', ()=>{login})
router.post('/order', ()=>{order})

export default router