import React from 'react';
import ParticipantCard from '../cards/ParticipantCard';

export default function ParticipantsPane({ participants }) {
	return (
		<>
			{participants.map((participant) => (
				<ParticipantCard key={participant.id} participant={participant} />
			))}
		</>
	);
}
