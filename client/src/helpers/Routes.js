import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LeagueView from '../views/LeagueView';

export default function Routes() {
	return (
		<Switch>
			<Route exact path='/' element={<HomeView />} />
			<Route path='/league/:id' element={<LeagueView />} />
		</Switch>
	);
}
