import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ParticipantCard from '../cards/ParticipantCard';

export default function ParticipantsPane({ isOwner, leagueId, participants }) {
	return (
		<>
			{isOwner ? (
				<Link to={`/league/add-participant/${leagueId}`}>
					<Button className='ms-4 my-2'>Add Participant</Button>
				</Link>
			) : (
				''
			)}
			<div className='d-flex flex-wrap m-3 text-center'>
				{participants.map((participant) => (
					<ParticipantCard
						key={participant.id}
						participant={participant}
						isOwner={isOwner}
					/>
				))}
			</div>
		</>
	);
}
