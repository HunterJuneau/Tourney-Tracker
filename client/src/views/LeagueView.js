import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeague } from '../helpers/data/leagueData';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { getLeagueGames } from '../helpers/data/gameData';
import { getLeagueParticipants } from '../helpers/data/participantData';
import GamesPane from '../components/panes/GamesPane';
import ParticipantsPane from '../components/panes/ParticipantsPane';
import InfoPane from '../components/panes/InfoPane';

export default function LeagueView() {
	const { id } = useParams();
	const [league, setLeague] = useState({});
	const [tab, setTab] = useState('1');
	const [isOwner, setIsOwner] = useState(false);
	const [games, setGames] = useState([]);
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		getLeague(id).then(setLeague);
		getLeagueGames(id).then(setGames);
		getLeagueParticipants(id).then(setParticipants);
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
					<GamesPane isOwner={isOwner} leagueId={league.id} games={games} />
				</TabPane>
				<TabPane tabId='2'>
					<ParticipantsPane isOwner={isOwner} leagueId={league.id} participants={participants} />
				</TabPane>
				<TabPane tabId='3'>
					<InfoPane league={league} />
				</TabPane>
			</TabContent>
		</>
	);
}
