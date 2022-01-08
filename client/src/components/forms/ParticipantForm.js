import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createParticipant } from '../../helpers/data/participantData';

export default function LeagueForm({ leagueId }) {
	const [name, setName] = useState('');
	let navigate = useNavigate();

	const handleInputChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		createParticipant({ leagueId, name }).then(() =>
			navigate(`/league/${leagueId}`),
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Label>* = required</Label>
			<FormGroup>
				<Label for='nameInput'>*Participant Name</Label>
				<Input
					id='nameInput'
					name='name'
					onChange={handleInputChange}
					value={name}
					type='text'
					required
				/>
			</FormGroup>
			<Button type='submit'>Submit</Button>
		</Form>
	);
}
