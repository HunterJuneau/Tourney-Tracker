import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

export default function LeagueCard({ league }) {
	const navigate = useNavigate();

	return (
		<Card color='light'>
			<CardBody>
				<CardTitle tag='h5'>{league.name}</CardTitle>
				<CardText>{league.description}</CardText>
				<Button
					color='primary'
					onClick={() => navigate(`/league/${league.id}`)}
				>
					View
				</Button>
			</CardBody>
		</Card>
	);
}
