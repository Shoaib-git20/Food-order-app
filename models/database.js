import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    foodName:{type: String, required:"name is required"},
    //Images: [{ type: Image }],
    price: {type:Number,required:"price is required"},
    orderedusers:[{
        userordered: String,
        userId: String,
    }]
})


export default mongoose.model("foodData", foodSchema)