import React from 'react';
import { useGame } from './GameContext';

interface Batsman {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isOut: boolean;
}

const PlayerScoreCard: React.FC = () => {
  const { gameState } = useGame();

  if (!gameState) {
    return <div>Loading...</div>;
  }

  const allBatsmen = [...gameState.currentBatsmen];
  const outBatsmen = allBatsmen.filter(batsman => batsman.isOut);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Player Score Card</h2>
      {outBatsmen.length === 0 ? (
        <p>No batsmen have been out.</p>
      ) : (
        <div className="flex flex-col space-y-2">
          {outBatsmen.map((batsman, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="font-semibold">{batsman.name}</span>
              <span>{batsman.runs} ({batsman.balls}b, {batsman.fours} 4s, {batsman.sixes} 6s)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerScoreCard;