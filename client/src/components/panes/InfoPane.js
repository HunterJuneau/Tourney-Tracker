import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteLeague } from '../../helpers/data/leagueData';
import { Card, CardBody, CardText, Button, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function InfoPane({ league, isOwner }) {
	let navigate = useNavigate();

	const deleteThis = () => {
		deleteLeague(league.id).then(() => navigate('/'));
	};

	return (
		<Card className='text-center'>
			<CardBody className='info-pane'>
				<CardSubtitle tag='h4'>Description</CardSubtitle>
				<CardText className='my-3'>{league.description}</CardText>
				<CardText>
					<h6>Minimum Rating</h6>
					{league.minimumRating}
				</CardText>
				<CardText>
					<h6>Starting Rating</h6>
					{league.startingRating}
				</CardText>
				{isOwner ? (
					<>
						<Button className='btn btn-danger mx-2' onClick={deleteThis}>
							Delete
						</Button>
						<Link to={`/league/edit/${league.id}`}>
							<Button className='btn btn-warning mx-2'>Edit</Button>
						</Link>
					</>
				) : (
					''
				)}
			</CardBody>
		</Card>
	);
}
