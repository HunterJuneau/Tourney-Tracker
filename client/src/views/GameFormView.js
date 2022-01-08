import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeagueParticipants } from '../helpers/data/participantData';
import GameForm from '../components/forms/GameForm';

export default function GameFormView() {
  const { leagueId } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
		getLeagueParticipants(leagueId).then(setParticipants);
	}, [leagueId]);

	return (
		<>
			<h1>New Game Form</h1>
			<GameForm leagueId={Number.parseInt(leagueId)} participants={participants} />
		</>
	);
}
