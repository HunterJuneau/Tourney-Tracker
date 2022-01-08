import axios from 'axios';
import dbUrl from '../apiKeys';

const getLeagueParticipants = (leagueId) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/Participant/${leagueId}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const getGameParticipants = (gameId) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/Participant/game/${gameId}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const createParticipant = (participant) =>
	new Promise((resolve, reject) => {
		axios.post(`${dbUrl}/Participant`, participant).then(resolve).catch(reject);
	});

export { getLeagueParticipants, getGameParticipants, createParticipant };
