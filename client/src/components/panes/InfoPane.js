import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteLeague } from '../../helpers/data/leagueData';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function InfoPane({ league, isOwner }) {
	let navigate = useNavigate();

	const deleteThis = () => {
		deleteLeague(league.id).then(() => navigate('/'));
	};

	return (
		<Card>
			<CardBody>
				<CardText>{league.description}</CardText>
				<CardText>Minimum Rating: {league.minimumRating}</CardText>
				<CardText>Starting Rating: {league.startingRating}</CardText>
				{isOwner ? (
					<>
						<Button onClick={deleteThis}>Delete</Button>
						<Link to={`/league/edit/${league.id}`}>
							<Button>Edit</Button>
						</Link>
					</>
				) : (
					''
				)}
			</CardBody>
		</Card>
	);
}
