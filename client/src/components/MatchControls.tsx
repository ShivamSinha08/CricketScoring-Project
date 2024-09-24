import React from 'react';
import { useGame } from './GameContext'; 

const MatchControls: React.FC = () => {
  const { gameState, setGameState } = useGame(); 

  const handlePlayerChange = (role: string, player: string) => {
   
    setGameState((prevState: any) => ({
      ...prevState,
      [role]: player,
    }));
  };

  const defaultBatsmen = ['Batsmen 1', 'Batsmen 2'];
  const defaultBowler = 'Bowler 1';

  const batsmen = gameState?.batsmen || defaultBatsmen;
  const bowler = gameState?.bowler || defaultBowler;

  return (
    <div className="flex justify-around items-center h-full">
      {/* Batsman (Striker) */}
      <div className="flex items-center space-x-2">
        <label className="font-semibold">Batsman (Striker)</label>
        <select
          className="border border-gray-400 p-2 rounded-md"
          value={gameState?.striker || batsmen[0]} 
          onChange={(e) => handlePlayerChange('striker', e.target.value)}
        >
          {batsmen.map((batsman: string) => (
            <option key={batsman} value={batsman}>
              {batsman}
            </option>
          ))}
        </select>
      </div>

      {/* Batsman (Non-Striker) */}
      <div className="flex items-center space-x-2">
        <label className="font-semibold">Batsman (Non-Striker)</label>
        <select
          className="border border-gray-400 p-2 rounded-md"
          value={gameState?.nonStriker || batsmen[1]} 
          onChange={(e) => handlePlayerChange('nonStriker', e.target.value)}
        >
          {batsmen.map((batsman: string) => (
            <option key={batsman} value={batsman}>
              {batsman}
            </option>
          ))}
        </select>
      </div>

      {/* Bowler */}
      <div className="flex items-center space-x-2">
        <label className="font-semibold">Bowler</label>
        <select
          className="border border-gray-400 p-2 rounded-md"
          value={gameState?.bowler || bowler} 
          onChange={(e) => handlePlayerChange('bowler', e.target.value)}
        >
          <option value={bowler}>{bowler}</option>
        </select>
      </div>
    </div>
  );
};

export default MatchControls;
