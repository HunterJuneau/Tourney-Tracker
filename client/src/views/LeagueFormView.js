import React from 'react';
import { useParams } from 'react-router-dom';
import LeagueForm from '../components/forms/LeagueForm';

export default function LeagueFormView() {
	const { id } = useParams();
	return (
		<>
			<h1>New League Form</h1>
			<LeagueForm id={Number.parseInt(id)} />
		</>
	);
}
