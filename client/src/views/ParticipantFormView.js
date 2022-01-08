import React from 'react';
import { useParams } from 'react-router-dom';
import ParticipantForm from '../components/forms/ParticipantForm';

export default function ParticipantFormView() {
  const { leagueId } = useParams();
	return (
		<>
			<h1>New Participant Form</h1>
			<ParticipantForm leagueId={Number.parseInt(leagueId)} />
		</>
	);
}
