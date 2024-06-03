const mongoose = require('mongoose');
const passwordLocalMongoose = require('passport-local-mongoose');
const Movie = require('./Movie');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true
    },
    img:{
        type:String,
        require:true,
        trim:true
    },
    role:{
        type:String,
        require:true
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie'
    }]
})

UserSchema.plugin(passwordLocalMongoose);
const User = mongoose.model('User',UserSchema);

module.exports = User;