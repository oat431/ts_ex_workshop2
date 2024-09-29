import express, { urlencoded, json } from "express";
import MovieReview from './data/movie-review.json' assert { type: "json"};

const port = 8080;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Server is up and running" });
});

app.get("/movie-review/all", (req, res) => {
    res.status(200).json(MovieReview);
});

app.get("/movie-review/v1/avg", (req, res) => {
    let totalMovie = MovieReview.length;
    let totalRating = 0;
    for(let i = 0; i < totalMovie; i++){
        totalRating += MovieReview[i].rating;
    }
    let avgRating = totalRating / totalMovie;
    res.status(200).json({msg: `Average rating of all movies is ${avgRating}`});
});

app.get("/movie-review/v2/avg", (req, res) => {
    let avgRating = MovieReview.reduce((acc, movie) => acc + movie.rating, 0) / MovieReview.length;
    res.status(200).json({msg: `Average rating of all movies is ${avgRating.toFixed(2)}`});
});

app.get("/movie-review/comment/:uuid", (req, res) => {
    let uuid = req.params.uuid;
    let movie = MovieReview.find((movie) => movie.id === uuid);
    if(movie){
        res.status(200).json(movie);
    } else {
        res.status(404).json({msg: "Movie not found"});
    }
});

app.post("/movie-review/add", (req, res) => {
    let movie = req.body;
    MovieReview.push(movie);
    res.status(201).json(MovieReview);
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});