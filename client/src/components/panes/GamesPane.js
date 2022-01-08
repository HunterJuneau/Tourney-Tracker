import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import GameCard from '../cards/GameCard';

export default function GamesPane({ isOwner, leagueId, games }) {
	return (
		<>
			{isOwner ? (
				<Link to={`/league/add-game/${leagueId}`}>
					<Button>Add Game</Button>
				</Link>
			) : (
				''
			)}
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</>
	);
}
