import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeagueParticipants } from '../helpers/data/participantData';
import GameForm from '../components/forms/GameForm';
import { getGame } from '../helpers/data/gameData';

export default function GameFormView() {
	const { leagueId } = useParams();
	const { gameId } = useParams();
	const [participants, setParticipants] = useState([]);
	const [game, setGame] = useState({});

	useEffect(() => {
		if (leagueId || game?.leagueId) {
			getLeagueParticipants(leagueId || game.leagueId).then(setParticipants);
		}
	}, [leagueId, game]);

	useEffect(() => {
		if (gameId) {
			getGame(gameId).then(setGame);
		}
	}, [gameId]);

	return (
		<>
			<h1>New Game Form</h1>
			<GameForm
				leagueId={Number.parseInt(leagueId)}
				gameId={Number.parseInt(gameId)}
				participants={participants}
			/>
		</>
	);
}
