const server = require('../lib/app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Get /roles', () => {
    it('GET /roles should return 200', async ()=> {
      const res = await requestWithSupertest.get('/api/account/role');
        expect(res.status).toEqual(200);
    });

    it('GET /roles with params returns 400', async ()=> {
      const res = await requestWithSupertest.get('/api/account/role').query({"id": 5});
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({"response": "Parameter not found"})
    });
});

describe("Get /search", () => {
  it('GET /search without params should return 200', async ()=> {
    const res = await requestWithSupertest.get('/api/account/search');
      expect(res.status).toEqual(200);
  });
  it('GET /search with incorrect params should return 400', async ()=> {
    const res = await requestWithSupertest.get('/api/account/search').query({"panther": "fire"})
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({"response": "Invalid query parameter, please ensure only these parameters are used sort_by,page,keyword,location,include_relocate,job_title,job_type,skill,years_experience,min_salary,max_salary,remote,visa,exclude_dealt_with,last_active_value,last_active_type,exclude_skipped,special_page,ui,default"})
  });
})

describe("Delete /member", () => {
  it('GET /member incorrect method', async ()=> {
    const res = await requestWithSupertest.get('/api/account/member');
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({"response": "Incorrect method"})
  });
  it('DELETE /member without required account_id should return 400', async ()=> {
    const res = await requestWithSupertest.delete('/api/account/member');
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({"response": "Missing required parameter(s) account_id"})
  });
  it('DELETE /member with required account_id wrong type should return 400', async ()=> {
    const res = await requestWithSupertest.delete('/api/account/member').send({"account_id": "5"});
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({"response": "account_id should be of type integer"})
  });
  it('DELETE /member with required account_id should return 200', async ()=> {
    const res = await requestWithSupertest.delete('/api/account/member').send({"account_id": 5});
      expect(res.status).toEqual(200);
  });
})

afterAll(() => {
  server.close()
})