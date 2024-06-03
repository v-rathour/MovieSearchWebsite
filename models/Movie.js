const mongoose = require('mongoose');
const Review = require('./Review');
const User = require('./User')

let movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        trim: true
    },
    year : {
        type: Number, 
        min: 0 ,
        required: true 
    } ,
    desc: {
        type: String,
        required: true
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review',
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})


let Movie = mongoose.model('Movie', movieSchema);
module.exports= Movie;