import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function GameCard({ game }) {
	return (
		<Card color='light'>
			<CardBody>
				<CardTitle tag='h5'>Work in Progress</CardTitle>
				<CardText>{game.date.replace('T', ' ')} UTC</CardText>
			</CardBody>
		</Card>
	);
}
