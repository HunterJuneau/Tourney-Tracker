import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
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
			<Link to='/league/new'>
				<Button type='button'>Add League</Button>
			</Link>
			<div>
				{leagues.map((league) => (
					<LeagueCard key={league.id} league={league} />
				))}
			</div>
		</>
	);
}
