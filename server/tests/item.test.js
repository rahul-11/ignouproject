const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async(done)=>{
  mongoose.connect("mongodb://localhost/test-whish", ()=>{
    mongoose.connection.db.dropDatabase(()=> done())
  });
});

describe('Item routes testing with valid inputs', async()=>{
  let token, listId, itemId;
  beforeAll(async(done)=>{
    const response = await request(app).post('/signup')
      .send({
        first_name : "tester",
        last_name: "suite",
        email: "testerItem@test",
        password: "tester"
      });
    token = response.body.token;

    const res = await request(app).post('/api/list/new')
      .set({'authorization': token})
      .send({ "list_name": "My List"});
    listId = res.body._id;

    const resp = await request(app).post(`/api/list/${listId}/new`)
      .set({'authorization': token})
      .send({
        "name": "My new item",
        "url": "http://test.com/item"
      });
    itemId = resp.body.items[0]._id;
    done();
  });

  test('can add a item to list', async(done)=>{
    const res = await request(app).post(`/api/list/${listId}/new`)
      .set({'authorization': token})
      .send({
        "name": "My item",
        "url": "http://test.com/newitem"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.items[1].name).toBe("My item");
    expect(res.body.items[1].url).toBe("http://test.com/newitem");
    expect(res.body._id).toBe(listId);
    done();
  });

  test('can delete a item from a list', async(done)=>{
    const res = await request(app).delete(`/api/list/${listId}/item`)
      .set({'authorization': token})
      .send({itemId: itemId});
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.items.length).toBe(1);
    done();
  });
});