const pactum = require('pactum');

it('should be a teapot', () => {
  return pactum.spec()
    .get('http://httpbin.org/status/418')
    .expectStatus(418);
});