const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const keys = require('../config/keys')

beforeAll((done)=>{
  mongoose.connect(keys.mongoURI+"/test", function(){
    mongoose.connection.db.dropDatabase(() => done())
  });
})

describe("User routes tests, using valid inputs", async()=>{
  let token;
  beforeAll(async(done)=>{
    const response = await request(app).post('/signup')
      .send({
        first_name : "tester",
        last_name: "suite",
        email: "testerUser@test",
        password: "tester"
      });
    token = response.body.token;
    done();
  });

  test('can access user information', async(done)=>{
    const response = await request(app).get('/api/user')
      .set({'authorization': token});

    expect(response.statusCode).toEqual(200);
    done();
  });

  test('can search a user by name', async(done)=>{
    const response = await request(app).get('/api/search')
      .set({'authorization': token})
      .send({'name': "tester"});

    expect(response.statusCode).toEqual(200);
    expect(response.body[0].first_name).toBe('tester');
    done();
  });

  test('get all the lists of user', async(done)=>{
    const res = await request(app).post('/api/list/new')
      .send({'list_name': "My list"})
      .set({'authorization': token});

    expect(res.statusCode).toEqual(200);

    const response = await request(app).get('/api/user/lists')
      .set({'authorization': token});
    
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].name).toBe("My list");
    done();
  });

  test('users profile info can be updated', async(done)=>{
    const response = await request(app).put('/api/user')
      .set({'authorization': token})
      .send({
        first_name : "testerNew",
        email: "testerNew@test"
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.first_name).toBe("testerNew");
    expect(response.body.email).toBe("testerNew@test");
    expect(response.body.last_name).toBe("suite");
    done();
  });

  test('user profile can be deleted', async(done)=>{
    const response = await request(app).delete('/api/user')
      .set({'authorization': token});
    expect(response.statusCode).toEqual(200);
    done();
  });

});