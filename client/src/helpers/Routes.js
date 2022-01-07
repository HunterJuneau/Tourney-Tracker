import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LeagueView from '../views/LeagueView';
import LeagueFormView from '../views/LeagueFormView';

export default function Routes() {
	return (
		<Switch>
			<Route exact path='/' element={<HomeView isPublic={true} />} />
			<Route path='/my-leagues' element={<HomeView isPublic={false} />} />
			<Route path='/league/:id' element={<LeagueView />} />
			<Route path='/league/new' element={<LeagueFormView />} />
		</Switch>
	);
}
