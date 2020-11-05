const CONFIG_DEV = require('./dev.config');
const CONFIG_PROD = require('./prod.config');

const config =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? CONFIG_DEV
		: CONFIG_PROD;

module.exports = config;
