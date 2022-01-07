import React from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

export default function InfoPane({ league }) {
	return (
		<Card>
			<CardBody>
				<CardText>{league.description}</CardText>
				<CardText>Minimum Rating: {league.minimumRating}</CardText>
				<CardText>Starting Rating: {league.startingRating}</CardText>
			</CardBody>
		</Card>
	);
}
