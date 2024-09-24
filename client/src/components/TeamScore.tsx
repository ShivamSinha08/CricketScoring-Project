import React from 'react';
import { useGame } from './GameContext';

const TeamScore: React.FC = () => {
  const { gameState } = useGame();

  if (!gameState) {
    return <div>Loading...</div>;
  }

  const { teamStats, currentBatsmen, currentBowler } = gameState;

  const formatOvers = (overs: number, balls: number) => {
    return `${Math.floor(overs)}.${balls}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Score Overview</h2>
      
      {/* Team Scores */}
      <div className="mb-4 text-center">
        <div className="flex justify-center items-center mb-2">
          <span className="text-3xl font-bold">{teamStats.teamA.name || "Team A"}</span>
          <span className="mx-4 text-xl">vs</span>
          <span className="text-3xl font-bold">{teamStats.teamB.name || "Team B"}</span>
        </div>
        <div className="flex justify-center mb-2">
          <span className="font-semibold text-lg">Total Score:</span>
        </div>
        
        {/* Team A and Team B Score Details */}
        <div className="flex justify-center mb-4">
          <span className="text-lg mr-8">
            {teamStats.teamA.score}-{teamStats.teamA.wickets} (
            {formatOvers(teamStats.teamA.overs, teamStats.teamA.balls)} overs)
          </span>
          
          <span className="text-lg">
            {teamStats.teamB.score}-{teamStats.teamB.wickets} (
            {formatOvers(teamStats.teamB.overs, teamStats.teamB.balls)} overs)
          </span>
        </div>
      </div>

      {/* Current Batsmen */}
      <h3 className="text-xl font-semibold mb-2">Current Batsmen</h3>
      <ul className="list-disc pl-4 mb-4">
        {currentBatsmen.map((batsman, index) => (
          <li key={index} className="hover:bg-gray-100 p-2 rounded transition-colors duration-200">
            <span className="font-medium">{batsman.name}</span>: {batsman.runs} runs ({batsman.balls} balls)
            <br />
            <span className="text-sm text-gray-600">4s: {batsman.fours}, 6s: {batsman.sixes}</span>
          </li>
        ))}
      </ul>

      {/* Current Bowler */}
      <h3 className="text-xl font-semibold mb-2">Current Bowler</h3>
      <p className="bg-gray-50 p-2 rounded border border-gray-300">
        {currentBowler.name}: {formatOvers(currentBowler.overs, currentBowler.balls)} overs, {currentBowler.runsConceded} runs, {currentBowler.wickets} wickets
      </p>
    </div>
  );
};

export default TeamScore;
