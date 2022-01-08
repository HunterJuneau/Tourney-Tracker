import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getParticipant } from '../../helpers/data/participantData';

export default function GameCard({ game }) {
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

	return (
		<Card color='light'>
			<CardBody>
				<CardTitle tag='h5'>{`${participant0.name || 'not found :('} vs. ${participant1.name || 'not found :('}`}</CardTitle>
				<CardSubtitle>{game.date.replace('T', ' ')} UTC</CardSubtitle>
				<CardText>{game.isFinal ? 'COMPLETED' : ''}</CardText>
			</CardBody>
		</Card>
	);
}
