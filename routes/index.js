const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/register', (req, res, next) =>{
  const  {username ,password} = req.body;
  //password şifrelenecek kelime, 10 şifreleme türü
  bcrypt.hash(password, 10).then((hash) =>  {
    const user = new User({
      username,
      password:hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) =>{
      res.json(err);
    });
  });
});

router.post('/authenticate',(req, res) =>{
  const {username, password} = req.body;

  User.findOne({
    username
  },
  (err, user) => {
    if (err){ throw err;}
    
    if (!user){
      res.json({
        status :false,
        message : 'Authenticate failed, user not found'
      });
    }
    else {
      //bcrypt ile şifreyi çöz
      bcrypt.compare(password, user.password).then((result) => {
        if (!result){
          res.json({
            status : false,
            message : 'Authenticate failed, password wrong'
          });
        }
        else{
          const payload = {
            //username : username demektir ;) yukarda da kullanıldı
            username
          };
          const token = jwt.sign(
              //gönderilecek veri
              payload,
              //secret key i app.js den al
              req.app.get('api_secret_key'),
              //12 saat süre sonra silinsin
              { expiresIn : 720}
          );
          res.json ({
            status: true,
            token
          });
        }
      })
    }
  }
  );
});


module.exports = router;
