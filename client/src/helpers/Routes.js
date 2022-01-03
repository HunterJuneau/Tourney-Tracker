import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';

export default function Routes() {
	return (
		<Switch>
			<Route path='/' element={<HomeView />} />
		</Switch>
	);
}
