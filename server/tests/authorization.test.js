const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll((done)=>{
  mongoose.connect("mongodb://localhost/test-whish", function(){
    mongoose.connection.db.dropDatabase(() => done())
  });
})

describe('Authorization using valid inputs', ()=>{
  it('can signup to app', async()=>{
    const response = await request(app).post('/signup')
      .send({
        first_name : "tester1",
        last_name: "suite",
        email: "tester1@test",
        password: "tester"
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body.token);
  });

  it('can signin to the app', async()=>{
    const response = await request(app).post('/signin')
      .send({
        email: "tester1@test",
        password: "tester"
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.token);
  });
});
