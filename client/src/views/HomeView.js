import React, { useState, useEffect } from 'react';
import LeagueCard from '../components/cards/LeagueCard';
import { getPublicLeagues, getUserLeagues } from '../helpers/data/leagueData';

export default function HomeView({ isPublic }) {
	const [leagues, setLeagues] = useState([]);

	useEffect(() => {
		if (isPublic) {
			getPublicLeagues().then(setLeagues);
		} else {
			getUserLeagues(1).then(setLeagues);
		}
	}, [isPublic]);

	return (
		<>
			<h1>{isPublic ? 'Public' : 'My'} Leagues</h1>
			{leagues.map((league) => (
				<LeagueCard key={league.id} league={league} />
			))}
		</>
	);
}
