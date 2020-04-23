const express = require('express');
const router = express.Router();

//model dosyasını al
const Movie = require('../models/Movie');

/* GET movies listing. */
router.post('/', (req, res, next) => {
  //body parser, yapılan isteği göndermek için kullanılır.
  //bu şekilde post edilen data ya erişilebilir.
  // const data = req.body;
  //gönderilen verinin çıktısı json şeklinde olduğu için object ile veriye erişilebilir.
  // const data = req.body.year;
  // res.json(data.title);
//  es6 daki desctructing yapısı ile veriyi aşağıdaki gibi alabiliriz. Kodu kısaltır.
//   const {title, imdb_score, category, year, country} = req.body;
  //gelen data modelden oluşturduğumuz nesnenin içine ekledik.
  /*
  const movie = new Movie({
    title : title,
    imdb_score :imdb_score,
    category : category,
    year : year,
    country :country
  });
  */
  //Yukarıda tüm elemanları tek tek atıyoruz,
  //Bu yöntem de ise geleni otomatik parçalar ve isimlerine göre elemanlara atar.
  //kral hareket
  const movie = new Movie(req.body);
/*
    movie.save((err,data) =>{
      if (err){res.send(err);}
      else{res.send(data);}
    });
  */
  //Yukardaki işlemin then catch promise yapısı ile kullanımı
  //aralarında hiç bir fark yok
  const promise = movie.save();
  promise.then((data) => {
    res.json({status : 1});
  }).catch((err) =>{
    res.json(err);
  });

});

module.exports = router;
