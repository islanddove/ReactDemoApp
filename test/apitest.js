const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index');

var badInput = {
    id: 5
}
var goodInput = {
    selected_id: 2
}

it('gets a json file from /getComparisonData', function (done) {
    request(app)
        .get('/getComparisonData')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
});

it('gets a json file from /getSortedWins', function (done) {
    request(app)
        .get('/getSortedWins')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
});

it('checks default values from /getComparisonData', function (done) {
    request(app)
        .get('/getComparisonData')
            .end(function(err, res) {
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.be.empty;
                expect(res.body[0].wins).to.equal(0);
                expect(res.body.length).to.equal(2);
                expect(res.statusCode).to.equal(200);
                done();
            });
});

it('checks default values from /getSortedWins', function (done) {
    request(app)
        .get('/getSortedWins')
            .end(function(err, res) {
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.be.empty;
                expect(res.body[0].wins).to.equal(0);
                expect(res.body[0].name).to.equal('HoneyCrisp');
                expect(res.body.length).to.equal(10);
                expect(res.statusCode).to.equal(200);
                done();
            });
});

it('should give an error code with wrong /putUpdateData parameter', function (done) {
    request(app)
        .put('/putUpdateData').send(badInput)
            .end(function(err, res) {
                expect(res.body.message).to.equal('no id selected');
                expect(res.statusCode).to.equal(400);
                done();
            });
});

it('should give a message with correct /putUpdateData parameter', function (done) {
    request(app)
        .put('/putUpdateData').send(goodInput) // 2
            .end(function(err, res) {
                expect(res.body.message).to.equal('request recieved');
                expect(res.statusCode).to.equal(200);
                done();
            });
});

it('first index in /getSortedWins should be Gala after /putUpdateData', function (done) {
    request(app)
        .get('/getSortedWins')
            .end(function(err, res) {
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.be.empty;
                expect(res.body[0].wins).to.equal(1);
                expect(res.body[0].name).to.equal('Gala');
                expect(res.body.length).to.equal(10);
                expect(res.statusCode).to.equal(200);
                done();
            });
});
