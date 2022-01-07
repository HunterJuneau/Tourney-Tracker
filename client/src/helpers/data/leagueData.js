import axios from 'axios';
import dbUrl from '../apiKeys';

const getPublicLeagues = () =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/League`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const getLeague = (id) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/League/${id}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const getUserLeagues = (userId) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/League/owner/${userId}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

export { getPublicLeagues, getUserLeagues, getLeague };
