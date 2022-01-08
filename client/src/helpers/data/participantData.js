import axios from 'axios';
import dbUrl from '../apiKeys';

const getLeagueParticipants = (leagueId) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/Participant/league/${leagueId}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const getParticipant = (id) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/Participant/${id}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const createParticipant = (participant) =>
	new Promise((resolve, reject) => {
		axios.post(`${dbUrl}/Participant`, participant).then(resolve).catch(reject);
	});

const deleteParticipant = (participantId) =>
	new Promise((resolve, reject) => {
		axios
			.delete(`${dbUrl}/Participant/${participantId}`)
			.then(resolve)
			.catch(reject);
	});

const updateParticipant = (id, participant) =>
	new Promise((resolve, reject) => {
		axios
			.put(`${dbUrl}/Participant/${id}`, participant)
			.then(resolve)
			.catch(reject);
	});

export {
	getLeagueParticipants,
	getParticipant,
	createParticipant,
	deleteParticipant,
	updateParticipant,
};
