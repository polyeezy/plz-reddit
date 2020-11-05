var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const {
	getSubreddits,
	getSubredditComments,
} = require('./actions/reddit.actions');

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
