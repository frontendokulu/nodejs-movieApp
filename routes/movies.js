const express = require('express');
const router = express.Router();

//model dosyasını al
const Movie = require('../models/Movie');

/* List All Movies */
router.get('/',(req,res) =>{
  //tüm fimleri al
  const promise = Movie.aggregate([
    {
      $lookup : {
        from : 'directors',
        localField : 'director_id',
        foreignField : '_id',
        as : 'director'
      }
    },
    {
      $unwind : '$director'
    }
  ]);
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

/*Top10 List*/
router.get('/top10',(req, res) =>{
  //tüm fimleri al
  const promise = Movie.find({ }, limit(10), sort({imdb_score: -1}));
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

/* Between Years */
router.get('/between/:start_year/:end_year',(req,res) =>{
  const {start_year, end_year} =req.params;

  const promise = Movie.find({
    year: { "$gte" : parseInt(start_year), "$lte" : parseInt(end_year) }
  });
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});


/* List ById Movies */
router.get('/:movie_id',(req, res, next) =>{
  const promise = Movie.findById((req.params.movie_id));

  promise.then((movie) =>{
    if (!movie) {
      next({message: 'The movie was not found', code: 99});
    }
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});


/* Save Movie */
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

/* Update ById Movie */
router.put('/:movie_id',(req, res, next) =>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    { new :true }
  );

  promise.then((movie) =>{
    if (!movie) {
      next({message: 'The movie was not found', code: 99});
    }
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});

/* Delete ById Movie */
router.delete('/:movie_id',(req, res, next) =>{
  const promise = Movie.findByIdAndRemove((req.params.movie_id));

  promise.then((movie) =>{
    if (!movie) {
      next({message: 'The movie was not found', code: 99});
    }
    res.json({status : 'Film Silindi'});
  }).catch((err) =>{
    res.json(err);
  });
});



module.exports = router;
