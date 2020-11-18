const fetch = require('node-fetch');

function getBearerAuthHeader(token) {
	return {
		'Content-Type': 'application/json',
		Authorization: `bearer ${token}`,
		'Access-Control-Allow-Origin': '*',
	};
}

function getSubredditComments(arg) {
	return fetch(
		`https://oauth.reddit.com/r/${arg.topic}/comments/${arg.id}?limit=${arg.limit}`,
		{
			method: 'GET',
			headers: getBearerAuthHeader(arg.token),
		}
	)
		.then((res) => res.json())
		.then((res) => {
			if (res.error) {
				throw new Error(res.message);
			}

			let srCommentData = res.map((item, index) => {
				return item.data;
			});

			let usefulCommentData = srCommentData[1].children.map((item) => {
				return item.data;
			});

			let CommentsDataThatMatters = usefulCommentData.map((item) => {
				return item;
			});
			return CommentsDataThatMatters.filter((item) => {
				// No empty data
				return item.body ? true : false;
			});
		});
}

function getSubreddits(arg) {
	return fetch(
		`https://oauth.reddit.com/r/${arg.topic}/${arg.sort}?limit=${arg.limit}&depth=3`,
		{
			method: 'GET',
			headers: getBearerAuthHeader(arg.token),
		}
	)
		.then((res) => res.json())
		.then((res) => {
			if (res.error) {
				throw new Error(res.message);
			}
			return res.data.children.map((item) => {
				return item.data;
			});
		});
}

module.exports = {
	getSubreddits,
	getSubredditComments,
};
