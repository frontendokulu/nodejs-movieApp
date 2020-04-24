const express = require('express');
const router = express.Router();

//Director modelini al
const Director = require('../models/Director');

//get directors with their movies
router.get('/', (req, res) =>{
  const promise = Director.aggregate([
    {
      $lookup: {
        from : 'movies',
        localField : '_id',
        foreignField : 'director_id',
        as : 'results'
      }
    },
    {
      $unwind : {
        path : '$results',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group : {
        //id ye göre grupla
        _id : {
          _id : '$_id',
          name : '$name',
          surname : '$surname',
          bio : '$bio'
        },
        movies : {
          //aynı yönetmene ait filmler movies object sine ekleniyor.
          $push : '$results'
        }
      }
    },
    {
      $project: {
        _id : '$_id._id',
        name : '$_id.name',
        surname : '$_id.surname',
        movies : '$movies',
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});


/*Save Director*/
router.post('/', (req, res, next) =>{
  const director = new Director(req.body);

  const promise = director.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});


module.exports = router;
