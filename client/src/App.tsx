import React from 'react';
import NavBar from './components/NavBar';
import MatchControls from './components/MatchControls';
import ScoreActionGrid from './components/ScoreActionGrid';
import TeamScore from './components/TeamScore';
import PlayerScoreCard from './components/PlayerScoreCard';
import Commentary from './components/Commentary';
import { GameProvider } from './components/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-col w-full mt-2">
     
          <div className="w-full flex flex-col h-1/2 p-4">
            <div className="w-full">
              <MatchControls />
            </div>
            <div className="w-full flex-grow mt-2">
              <ScoreActionGrid />
            </div>
          </div>

          <div className="w-full flex h-1/2">
            <div className="w-1/2 pr-4">
              <TeamScore />
            </div>
            <div className="w-1/2 pl-4">
              <PlayerScoreCard />
              <Commentary />
            </div>
          </div>
        </div>
      </div>
    </GameProvider>
  );
};

export default App;