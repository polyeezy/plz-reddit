var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const {
	getSubreddits,
	getSubredditComments,
} = require('./actions/reddit.actions');
const fetch = require('node-fetch');

const Config = require('./config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const schema = require('./schema');

// Construct a schema, using GraphQL schema language

// The root provides a resolver function for each API endpoint
var root = {
	subreddits: getSubreddits,
	getComments: getSubredditComments,
};

var app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

async function getToken() {
	return new Promise((resolve, reject) => {
		try {
			fetch(
				`https://www.reddit.com/api/v1/access_token?grant_type=client_credentials&duration=permanent`,
				{
					method: 'POST',
					headers: {
						Authorization: `Basic ${Config.redditBasicAuth}`,
					},
				}
			)
				.then((result) => result.json())
				.then(resolve)
				.catch(reject);
		} catch (err) {
			reject(err);
		}
	});
}

app.get('/token', (req, res) => {
	getToken(Config.redditAppSecret, Config.redditAppSecret)
		.then((JSONToken) => {
			res.status(200).send(JSONToken);
		})
		.catch((err) => {
			res.status(404).send(err.message);
		});
});

app.options('*', cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

app.listen(4000);
