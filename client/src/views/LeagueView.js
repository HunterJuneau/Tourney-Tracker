import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeague } from '../helpers/data/leagueData';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import GamesPane from '../components/panes/GamesPane';
import { getLeagueGames } from '../helpers/data/gameData';

export default function LeagueView() {
	const { id } = useParams();
	const [league, setLeague] = useState({});
	const [tab, setTab] = useState('1');
	const [games, setGames] = useState([]);
	const [isOwner, setIsOwner] = useState(false);

	useEffect(() => {
		getLeague(id).then(setLeague);
		getLeagueGames(id).then(setGames);
	}, [id]);

	useEffect(() => {
		if (league.ownerId === 1) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [league]);

	return (
		<>
			<h1>{league.name}</h1>
			<Nav tabs>
				<NavItem>
					<NavLink
						className={tab === '1' ? 'active' : ''}
						onClick={() => setTab('1')}
					>
						Games
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={tab === '2' ? 'active' : ''}
						onClick={() => setTab('2')}
					>
						Participants
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={tab === '3' ? 'active' : ''}
						onClick={() => setTab('3')}
					>
						Info
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={tab}>
				<TabPane tabId='1'>
					<h1>Games</h1>
					<GamesPane games={games} />
				</TabPane>
				<TabPane tabId='2'>
					<h1>Participants</h1>
				</TabPane>
				<TabPane tabId='3'>
					<h1>Info</h1>
				</TabPane>
			</TabContent>
		</>
	);
}
