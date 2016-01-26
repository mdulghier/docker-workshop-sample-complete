var wd = require('wd');

describe('UI', function() {
	var browser;

	before(function() {
		browser = wd.promiseChainRemote('selenium', 4444);
		return browser.init({browserName: 'phantomjs'});
	});

	it('should open health endpoint in browser', function(done) {
		var url = (process.env.APP_ADDRESS || 'http://localhost:3000') + '/index.html';
		browser
			.get(url)
			.url(function(err, url) { 
				console.log(url);
			})
			.title(function(err, title) {
				console.log(title);
				done();
			})
	});
});
