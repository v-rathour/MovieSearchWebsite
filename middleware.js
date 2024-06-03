
const Movie = require('./models/Movie')

const isLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be logged in First.')
        return res.redirect('/login')
    }
    next()
}

const isContributor = (req,res,next)=>{
    if(!req.user.role || req.user.role != 'contributer'){
         req.flash('error',"you don't have the permission to do that")
         return res.redirect('/movies')
    }
    next();
}

const isMovieDelete = async (req,res,next)=>{
    let {id} = req.params;
    const movie = await Movie.findById(id)
    if(!movie.author.equals(req.user._id)){
        req.flash('error',"you don't have the permission to do that")
        return res.redirect('/movies')
    }
    next();
}   

module.exports = {
    isLoggedIn,
    isContributor,
    isMovieDelete
}