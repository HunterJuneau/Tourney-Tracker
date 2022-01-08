import axios from 'axios';
import dbUrl from '../apiKeys';

const getLeagueGames = (leagueId) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/Game/league/${leagueId}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

const createGame = (game) =>
	new Promise((resolve, reject) => {
		axios.post(`${dbUrl}/Game`, game).then(resolve).catch(reject);
	});

const deleteGame = (gameId) =>
	new Promise((resolve, reject) => {
		axios.delete(`${dbUrl}/Game/${gameId}`).then(resolve).catch(reject);
	});

export { getLeagueGames, createGame, deleteGame };
