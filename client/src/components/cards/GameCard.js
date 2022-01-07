import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getGameParticipants } from '../../helpers/data/participantData';

export default function GameCard({ game }) {
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		getGameParticipants(game.id).then(setParticipants);
	}, [game]);

	const printTitle = () => {
		let team0String = '';
		let team1String = '';

		for (let i = 0; i < participants.team0?.length; i++, team0String += ', ') {
			team0String += participants.team0[i].name;
		}

		for (let i = 0; i < participants.team1?.length; i++, team1String += ', ') {
			team1String += participants.team1[i].name;
		}

		return `${team0String.slice(0, -2) || 'No participants...'} vs. ${
			team1String.slice(0, -2) || 'No participants...'
		}`;
	};

	return (
		<Card color='light'>
			<CardBody>
				<CardTitle tag='h5'>{printTitle()}</CardTitle>
				<CardSubtitle>{game.date.replace('T', ' ')} UTC</CardSubtitle>
				<CardText>{game.isFinal ? 'COMPLETED' : ''}</CardText>
			</CardBody>
		</Card>
	);
}
