import Config from '../config';

export const getBasicAuth = (username, password) => {
	let encodedCredentials = Buffer.from(`${username}:${password}`).toString(
		'base64'
	);
	return `Basic ${encodedCredentials}`;
};

function getBasicAuthHeader(username, password) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', getBasicAuth(username, password));
	return myHeaders;
}

function getBearerAuthHeader(token) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', `bearer ${token}`);
	return myHeaders;
}

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export const getAccessToken = (username, password) => {
	return new Promise((resolve, reject) => {
		fetch(Config.accessTokenUrl, {
			method: 'POST',
			headers: getBasicAuthHeader(username, password),
		})
			.then(resolve)
			.catch(reject);
	});
};

export const getHotTopics = (token) => {
	return new Promise((resolve, reject) => {
		fetch(Config.baseUrl, {
			method: 'GET',
			headers: getBearerAuthHeader(token),
		});
	});
};
