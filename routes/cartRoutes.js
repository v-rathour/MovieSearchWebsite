const express = require('express');
const routes = express.Router();
const {isLoggedIn} = require('../middleware'); // conditional rendering

const Movie = require('../models/Movie');
const User = require('../models/User');
const { route } = require('./movieRoutes');

routes.get('/user/cart',isLoggedIn,async (req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart',{user});
})

routes.post('/user/:movieId/add',isLoggedIn,async (req,res)=>{
    let {movieId} = req.params;
    let userid = req.user._id;
    let movie = await Movie.findById(movieId);
    let user = await User.findById(userid);
    user.cart.push(movie);
    user.save()
    res.redirect('/user/cart')
})

routes.delete('/user/:cartId', async(req,res)=>{
    const userId = req.user._id;
    const {cartId} = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
         // Use $pull to remove the specified cartId from the cart array
        user.cart.pull(cartId);
        // Save the updated user object
        await user.save();

        res.redirect('/user/cart')
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Internal Server Error' });
        res.redirect('/user/cart')
  }

})

module.exports = routes;