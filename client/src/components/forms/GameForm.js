import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createGame } from '../../helpers/data/gameData';

export default function LeagueForm({ participants, leagueId }) {
	const [game, setGame] = useState({
		date: '',
		isFinal: false,
		winner: false,
		participant0: '',
		participant1: '',
	});
	let navigate = useNavigate();

	const handleInputChange = (e) => {
		setGame((prevState) => ({
			...prevState,
			[e.target.name]:
				e.target.name === 'isFinal' ? e.target.checked : e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

    const newGame = {
      leagueId,
      date: game.date,
      isFinal: game.isFinal,
      winner: game.winner === 'true',
      participant0: Number.parseInt(game.participant0),
      participant1: Number.parseInt(game.participant1),
    }
    if (newGame.participant0 === newGame.participant1) {
      alert('Participant 1 and Participant 2 must be different!')
    } else {
      createGame(newGame).then(() =>
			navigate(`/league/${leagueId}`),
		)
    }
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Label>* = required</Label>
			<FormGroup>
				<Label for='participant0Select'>*Participant 1</Label>
				<Input
					id='participant0Select'
					name='participant0'
					type='select'
					onChange={handleInputChange}
					value={game.participant0}
				>
					<option value='' disabled hidden>
						Choose a participant...
					</option>
					{participants.map((item) => (
						<option value={item.id} key={item.id}>
							{`Name: ${item.name} | Rating: ${item.elo}`}
						</option>
					))}
				</Input>
			</FormGroup>
			<FormGroup>
				<Label for='participant1Select'>*Participant 2</Label>
				<Input
					id='participant1Select'
					name='participant1'
					type='select'
					onChange={handleInputChange}
					value={game.participant1}
				>
					<option value='' disabled hidden>
						Choose a participant...
					</option>
					{participants.map((item) => (
						<option value={item.id} key={item.id}>
							{`Name: ${item.name} | Rating: ${item.elo}`}
						</option>
					))}
				</Input>
			</FormGroup>
			<FormGroup check>
				<Input
					id='final'
					type='checkbox'
					name='isFinal'
					onChange={handleInputChange}
				/>
				<Label check for='final'>
					Final?
				</Label>
			</FormGroup>
			<FormGroup>
				<Label for='winnerSelect'>Winner</Label>
				<Input
					id='winnerSelect'
					name='winner'
					type='select'
					onChange={handleInputChange}
					value={game.winner}
				>
					<option value={false} key='0'>
						Participant 1
					</option>
					<option value={true} key='1'>
						Participant 2
					</option>
				</Input>
			</FormGroup>
			<FormGroup>
				<Label for='date'>Date</Label>
				<Input id='date' name='date' type='datetime-local' onChange={handleInputChange} value={game.date} />
			</FormGroup>
			<Button type='submit'>Submit</Button>
		</Form>
	);
}
