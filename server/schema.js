var { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
		  subreddits(topic: String, sort: String, limit: Int, token: String): 
		  [Subreddit]
		  getComments(topic: String, id: String, limit: Int, token: String): [Comment]
    },
    type Subreddit {
		  title: String
		  id: String
		  topic: String
		  subreddit: String
		  comments: [Comment]
	 }
	 type Comment {
		 body: String
		 id: String
	 }
`);

module.exports = schema;
