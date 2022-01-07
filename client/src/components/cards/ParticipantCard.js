import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default function ParticipantCard({ participant }) {
	return (
		<Card color='light'>
			<CardBody>
				<CardTitle tag='h5'>{participant.name}</CardTitle>
				<CardSubtitle>Rating: {participant.elo}</CardSubtitle>
			</CardBody>
		</Card>
	);
}
