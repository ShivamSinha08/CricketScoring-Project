import React from 'react';
import { useGame } from './GameContext';
import TeamScore from './TeamScore';
import Commentary from './Commentary';
import PlayerScoreCard from './PlayerScoreCard';

const CricketScoreboard: React.FC = () => {
  const { gameState, handleAction, errorMessage } = useGame();

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <TeamScore
        teamStats={gameState.teamStats}
        currentBowler={gameState.currentBowler}
        onAction={handleAction}
      />
      <PlayerScoreCard currentBatsmen={gameState.currentBatsmen} />
      <Commentary commentary={gameState.commentary} />
      {errorMessage && (
        <div className="text-red-500 mt-4">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CricketScoreboard;