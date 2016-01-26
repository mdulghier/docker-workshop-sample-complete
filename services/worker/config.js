module.exports = {
	redisPort: process.env.REDISPORT || 6379,
	redisHost: process.env.REDISHOST || 'localhost',
	mongoConnectionString: process.env.MONGOCONNECTIONSTRING || 'mongodb://localhost:27017/wssample'
};
