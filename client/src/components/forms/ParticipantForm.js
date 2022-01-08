import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {
	createParticipant,
	getParticipant,
	updateParticipant,
} from '../../helpers/data/participantData';

export default function LeagueForm({ leagueId, participantId }) {
	const [name, setName] = useState('');
	const [lId, setLId] = useState(0);
  const [id, setId] = useState(0);
	let navigate = useNavigate();

	useEffect(() => {
		if (participantId) {
			getParticipant(participantId).then((response) => {
				setName(response.name);
				setLId(response.leagueId);
        setId(response.id)
			});
		}
	}, [participantId]);

	const handleInputChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (leagueId) {
			createParticipant({ leagueId, name }).then(() => {
				navigate(`/league/${leagueId}`);
			});
		} else {
			updateParticipant(id, { name }).then(() => {
				navigate(`/league/${lId}`);
			});
		}
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
