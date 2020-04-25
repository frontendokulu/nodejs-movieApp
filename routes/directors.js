const mongoose = require('mongoose');
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

//get one _id directors with their movies
router.get('/:director_id', (req, res) =>{
  const promise = Director.aggregate([
      {
        $match: {
          //_id objectId tipinde olduğu için tür dönüşümü yapıldı
          '_id' : mongoose.Types.ObjectId( req.params.director_id)
        }
      },
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

/* Update ById Director */
router.put('/:director_id',(req, res, next) =>{
  const promise = Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      { new :true }
  );
  promise.then((director) =>{
    if (!director) {
      next({message: 'The director was not found', code: 99});
    }
    res.json(director);
  }).catch((err) =>{
    res.json(err);
  });
});

/* Delete ById Director */
router.delete('/:director_id',(req, res, next) =>{
  const promise = Director.findByIdAndRemove((req.params.director_id));

  promise.then((director) =>{
    if (!director) {
      next({message: 'The director was not found', code: 99});
    }
    res.json({status : 'Film Silindi'});
  }).catch((err) =>{
    res.json(err);
  });
});


module.exports = router;
