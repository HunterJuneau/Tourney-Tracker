import axios from 'axios';
import dbUrl from '../apiKeys';

const getLeagueGames = (leagueId) =>
	new Promise((resolve, reject) => {
		axios
			.get(`${dbUrl}/Game/league/${leagueId}`)
			.then((response) => resolve(response.data))
			.catch(reject);
	});

export { getLeagueGames };
