var { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
		  subreddits(topic: String, sort: String, limit: Int): 
		  [Subreddit]
		  getComments(topic: String, id: String, limit: Int): [Comment]
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
