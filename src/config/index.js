const CONFIG_DEV = require('./dev.config').default;
const CONFIG_PROD = require('./prod.config').default;

const config =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? CONFIG_DEV
		: CONFIG_PROD;

export default config;
