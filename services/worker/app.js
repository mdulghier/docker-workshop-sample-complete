var readline = require('readline'),
	Queue = require('bull'),
	MongoClient = require('mongodb').MongoClient,
	config = require('./config');

var jobQueue = Queue('job queue', config.redisPort, config.redisHost);

MongoClient.connect(config.mongoConnectionString, function(err, db) {
	if (err) throw err;
	var messages = db.collection('messages');

	jobQueue.process(function(job, done) {
		console.log('Received job: ', job.data);
		messages.insert({ message: job.data.message }, function(err, doc) {
			if (err) {
				console.log('Insert failed');
				return done(err);
			}
			done();
		});
	});

});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
	console.log('Shutting down ...');
	process.exit(0);
}
