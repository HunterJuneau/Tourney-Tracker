import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ParticipantCard from '../cards/ParticipantCard';

export default function ParticipantsPane({ isOwner, leagueId, participants }) {
	return (
		<>
			{isOwner ? (
				<Link to={`/league/add-participant/${leagueId}`}>
					<Button>Add Participant</Button>
				</Link>
			) : (
				''
			)}
			<div>
				{participants.map((participant) => (
					<ParticipantCard key={participant.id} participant={participant} />
				))}
			</div>
		</>
	);
}
