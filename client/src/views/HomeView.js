import React, { useState, useEffect } from 'react';
import LeagueCard from '../components/cards/LeagueCard';
import { getPublicLeagues } from '../helpers/data/leagueData';

export default function HomeView() {
	const [leagues, setLeagues] = useState([]);

	useEffect(() => {
		getPublicLeagues().then(setLeagues);
	}, []);

	return (
		<>
			<h1>Public Leagues</h1>
			<div>DO YOU SEE ME?</div>
			{leagues.map((league) => (
				<LeagueCard key={league.id} league={league} />
			))}
		</>
	);
}
