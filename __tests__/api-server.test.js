/* eslint-disable no-console */
const { server } = require('../src/app');
const supergoose = require('./supergoose.js');

const mockRequest = supergoose.server(server);

describe('api-server', () => {
  it('should respond to get a job from /api/v1/:model', () => {
    return mockRequest
      .get('/api/v1/job')
      .then((results) => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(0);
      }).catch(console.error);
  });

  it('should respond to creating a job /api/v1/:model', () => {
    return mockRequest
      .post('api/v1/job')
      .send({ title: 'Test', location: 'test stuff', dateApplied: 'today' })
      .then((results) => {
        expect(results.status).toBe(200);
        expect(results.body.title).toBe('Test');
      }).catch(console.error);
  });


  it('should respond properly to updating a job on /api/v1/job', () => {
    const testJob = {
      title: 'Test', location: 'test stuff', dateApplied: 'today',
    };
    const updateJob = {
      title: 'Test', location: 'seattle', dateApplied: 'yesterday',
    };

    return mockRequest.put('/api/v1/job')

      .send(testJob)
      .then((result) => {
        return mockRequest.put(`/api/vq/job/${result.body._id}`).send(updateJob);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testJob.title);
      });
  });

  it('should respond properly to deleting a job on /api/v1/job', () => {
    const testJob = {
      title: 'Test', location: 'test stuff', dateApplied: 'today',
    };

    return mockRequest.post('/api/v1/job')

      .send(testJob)
      .then((result) => {
        return (mockRequest.delete(`/api/v1/job/${result.body._id}`));
      })

      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(testJob.title);
      });
  });
});
