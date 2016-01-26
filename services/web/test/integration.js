var request = require('supertest');

describe('Integration test', function() {
	it ('should return 200 on health endpoint', function(done) {
		request(process.env.APP_ADDRESS || 'http://localhost:3000')
			.get('/').expect(200, done);
	});
});
