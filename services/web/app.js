var express = require('express'),
	bodyParser = require('body-parser'),
	Queue = require('bull'),
	config = require('./config');

var app = express();
app.use(bodyParser.json({type: '*/*'}));

var jobQueue = Queue('job queue', config.redisPort, config.redisHost);

app.get('/', function(req, res) {
	return res.status(200).send({
		status: 'OK',
		upstream: [
			{ 'worker': 'OK' }
		]
	});
});

app.post('/', function(req, res) {
	if (!req.body.message) { 
		return res.status(400).end();
	}
	console.log('Received request: ', req.body);
	jobQueue.add({ message: req.body.message });
	return res.status(201).end();
});

app.get('/index.html', function(req, res) {
	return res.sendFile(__dirname + '/index.html');
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Server started...');
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
	console.log('Shutting down ...');
	server.close(function() {
		process.exit(0);
	});
}
