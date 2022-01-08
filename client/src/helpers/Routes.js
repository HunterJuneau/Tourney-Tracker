import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import GameFormView from '../views/GameFormView';
import HomeView from '../views/HomeView';
import LeagueFormView from '../views/LeagueFormView';
import LeagueView from '../views/LeagueView';
import ParticipantFormView from '../views/ParticipantFormView';

export default function Routes() {
	return (
		<Switch>
			<Route exact path='/' element={<HomeView isPublic={true} />} />
			<Route path='/my-leagues' element={<HomeView isPublic={false} />} />
			<Route path='/league/new' element={<LeagueFormView />} />
			<Route path='/league/:id' element={<LeagueView />} />
			<Route
				path='/league/add-participant/:leagueId'
				element={<ParticipantFormView />}
			/>
			<Route path='/league/add-game/:leagueId' element={<GameFormView />} />
		</Switch>
	);
}
