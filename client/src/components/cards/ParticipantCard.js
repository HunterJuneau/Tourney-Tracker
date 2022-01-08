import React from 'react';
import { deleteParticipant } from '../../helpers/data/participantData';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function ParticipantCard({ participant, isOwner }) {
	const deleteThis = () => {
		deleteParticipant(participant.id).then(() => window.location.reload(true));
	};

	return (
		<Card color='light'>
			<CardBody>
				<CardTitle tag='h5'>{participant.name}</CardTitle>
				<CardSubtitle>Rating: {participant.elo}</CardSubtitle>
				{isOwner ? (
					<>
						<Button onClick={deleteThis}>Delete</Button>
						<Link to={`/league/edit-participant/${participant.id}`}>
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
