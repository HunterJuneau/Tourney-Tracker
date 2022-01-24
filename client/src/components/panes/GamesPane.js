import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import GameCard from '../cards/GameCard';

export default function GamesPane({ isOwner, leagueId, games }) {
	return (
		<>
			{isOwner ? (
				<Link to={`/league/add-game/${leagueId}`}>
					<Button className='ms-4 my-2'>Add Game</Button>
				</Link>
			) : (
				''
			)}
			<div className='d-flex flex-wrap m-3 text-center'>
				{games.map((game) => (
					<GameCard
						key={game.id}
						game={game}
						leagueId={leagueId}
						isOwner={isOwner}
					/>
				))}
			</div>
		</>
	);
}
