import React, { useState, useEffect } from 'react';
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getParticipant } from '../../helpers/data/participantData';
import { deleteGame } from '../../helpers/data/gameData';

export default function GameCard({ game, leagueId, isOwner }) {
	const [participant0, setParticipant0] = useState({});
	const [participant1, setParticipant1] = useState({});

	useEffect(() => {
		if (game.participant0) {
			getParticipant(game.participant0).then(setParticipant0);
		}
		if (game.participant1) {
			getParticipant(game.participant1).then(setParticipant1);
		}
	}, [game]);

	const deleteThis = () => {
		deleteGame(game.id).then(() => window.location.reload(true));
	};

	return (
		<Card color='light' className='m-3 game-card'>
			<CardBody className={game.isFinal ? 'game-card' : 'mt-4 game-card'}>
				{game.isFinal ? (
					<CardSubtitle
						tag='h6'
						className={game.winner ? 'text-end' : 'text-start'}
					>
						WINNER
					</CardSubtitle>
				) : (
					''
				)}
				<CardTitle tag='h5'>{`${participant0.name || 'not found :('} vs. ${
					participant1.name || 'not found :('
				}`}</CardTitle>
				<CardSubtitle>{game.date.replace('T', ' ')} UTC</CardSubtitle>
				<CardText>{game.isFinal ? 'COMPLETED' : ''}</CardText>
				{isOwner ? (
					<div>
						<Button className='btn btn-danger mx-1' onClick={deleteThis}>
							Delete
						</Button>
						<Link to={`/league/edit-game/${game.id}`}>
							<Button className='btn btn-warning mx-1'>Edit</Button>
						</Link>
					</div>
				) : (
					''
				)}
			</CardBody>
		</Card>
	);
}
