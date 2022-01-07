import React from 'react';
import GameCard from '../cards/GameCard';

export default function GamesPane({ games }) {
	return (
		<>
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</>
	);
}
