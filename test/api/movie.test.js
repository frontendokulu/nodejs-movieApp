const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies test',()=>{
    //teste başlamadan önce token almak gerekiyor
    //bunun için before kullanılır.
    before((done) => {
        //sunucuya bağlan
        chai.request(server)
        //authenticate e git username ve password ü post yöntemiyle gönder.
            .post('/authenticate')
            .send({username:'test', password : '87654321'})
            .end((err, res) =>{
                //gelen cevabı token değişkenine ata
                token = res.body.token;
                // console.log(token);
                done();
            });
    });
    describe('/GET movies', () => {
        it('it should GET all movies', (done) => {
            chai.request(server)
                //api/movies e git
                .get('/api/movies')
                //token x-access-token header olarak gönder
                .set('x-access-token',token)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    });
    describe('/POST movie', () => {
        it('it should POST a movie', (done) =>{
            const movie = {
                title : 'test movie',
                director_id: '5ea318f88ddd142d20d6e0dc',
                category: 'comedy',
                country : 'Turkey',
                year: 2000,
                imdb_score:7.4
            };

            chai.request(server)
                .post('/api/movies/')
                .send(movie)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    done();
                });
        });
    });

});

