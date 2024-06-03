const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router() // mini application/instance routes
const {isLoggedIn,isMovieDelete,isContributor} = require('../middleware'); // conditional rendering
const Review = require('../models/Review');

//router provides the instance by which we can send requests

router.get('/', (req, res) => {
    res.render('auth/login')
})

router.get('/movies/',isLoggedIn, async (req, res) => {
    let movies = await Movie.find({});// promise
    res.render('movies/index', { movies });
})

router.get('/movies/new',isLoggedIn, (req, res) => {
    res.render('movies/new');
})

// ACTUALLY ADDING IN THE DATABASE
router.post('/movies/', isLoggedIn,isContributor,async (req, res) => {
    let { name, img, year, desc, review } = req.body;
    await Movie.create({ name, img, year, desc, review, author:req.user._id});
    res.redirect('/movies');
})

// TO SHOW A PARTICULAR Movie
router.get('/movies/:id',isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let foundMovie = await Movie.findById(id).populate('review');
    res.render('movies/show', { foundMovie })

})


// FORM TO EDIT A PARTIICULAR Movie
router.get('/movies/:id/edit',isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let foundMovie = await Movie.findById(id);
    res.render('movies/edit', { foundMovie })
})


// TO ACTUALLY CHANGE IN db
router.patch('/movies/:id',isLoggedIn,isMovieDelete, async (req, res) => {
    let { id } = req.params;
    let { name, img, year, desc } = req.body;
    await Movie.findByIdAndUpdate(id, { name, img, year, desc });
    res.redirect(`/movies/${id}`);
})

// DELETE THE EXISTING PRODUCT
router.delete('/movies/:id',isLoggedIn,isMovieDelete, async (req, res) => {

    let { id } = req.params;
    let movie = await Movie.findById(id);
    
    for (let idd of movie.review) { 
        await Review.findByIdAndDelete(idd);
    }

    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');  
   
})



module.exports = router;