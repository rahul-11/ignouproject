const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async(done)=>{
  mongoose.connect("mongodb://localhost/test-whish", ()=>{
    mongoose.connection.db.dropDatabase(()=> done())
  });
});

describe('Lists tests using valid inputs', async()=>{
  let token, listId;
  beforeAll(async(done)=>{
    const response = await request(app).post('/signup')
      .send({
        first_name : "tester",
        last_name: "suite",
        email: "testerList@test",
        password: "tester"
      });
    token = response.body.token;

    const res = await request(app).post('/api/list/new')
      .set({'authorization': token})
      .send({ "list_name": "My List"});
    listId = res.body._id;
    done();
  });

  test('can create a list for a user', async(done)=>{
    const response = await request(app).post('/api/list/new')
      .set({'authorization': token})
      .send({
        'list_name' : "My new list",
        'access': "private"
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toBe("My new list");
    expect(response.body.access).toBe("private");
    done();
  });

  test('can retrieve a list using list id', async(done)=>{
    const res = await request(app).get(`/api/list/${listId}`)
      .set({'authorization': token});

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("My List");
    expect(res.body.access).toBe("public");
    done();
  });

  test('can update list info', async(done)=>{
    const res = await request(app).put(`/api/list/${listId}`)
      .set({'authorization': token})
      .send({
        'name': "Updated list",
        'access': 'private'
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe("Updated list");
      expect(res.body.access).toBe("private");
      done();
  });

  test('can delete the entire list', async(done)=>{
    const res = await request(app).delete(`/api/list/${listId}`)
      .set({'authorization': token});
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(undefined);
    done();
  });
});