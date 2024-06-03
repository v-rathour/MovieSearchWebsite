// this file contains initial dummy information or data
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

let Movies = [
  {
    name: "Jaani Dushman",
    img: "https://upload.wikimedia.org/wikipedia/en/9/94/Jani_Dushman.jpg",
    year: 2002,
    desc: "aani Dushman: Ek Anokhi Kahaani (transl. Sworn Enemy: A Unique Story) is a 2002 Indian Hindi-language fantasy action thriller film directed and produced by Rajkumar Kohli, making it his last film as a director.",
  },
  {
    name: "Cirkus",
    img: "https://upload.wikimedia.org/wikipedia/en/a/ab/Cirkus_film_poster.jpg",
    year: 2022,
    desc: "Cirkus is a 2022 Indian Hindi-language period comedy-drama film [4][5] directed and produced by Rohit Shetty. ",
  }
];
async function seedDB() {
    await Movie.insertMany(Movies);
    console.log("Data seeded");
}
module.exports=seedDB;