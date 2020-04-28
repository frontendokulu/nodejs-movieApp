const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

describe('Node Server',()=>{
    it('(GET(/ ) homepage test', (done) =>{
        //app.js e istektede bulun,
        chai.request(server)
        // url. / olduğu için localhost:3000
            .get('/')
            .end((err, res)=> {
                //dönen sonuç 200 olmalı
                res.should.have.status(200);
                done();
            });
    });
});
