import React, { useState, useEffect } from 'react';
import axios from 'axios';

type ScoringActionType =
  | "newBall"
  | "endBall"
  | "normal"
  | "wide"
  | "noBall"
  | "bye"
  | "legBye"
  | "wicket"
  | "overthrow";

interface GameState {
  teamStats: {
    teamA: {
      score: number;
      wickets: number;
      overs: number;
      balls: number;
      noBalls: number;
      wides: number;
      byes: number;
      legByes: number;
    };
    teamB: {
      score: number;
      wickets: number;
      overs: number;
      balls: number;
      noBalls: number;
      wides: number;
      byes: number;
      legByes: number;
    };
  };
  currentBatsmen: Array<{
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    isOut: boolean;
  }>;
  currentBowler: {
    name: string;
    overs: number;
    balls: number;
    runsConceded: number;
    wickets: number;
    maidens: number;
  };
  commentary: string[];
  isNewBall: boolean;
  isFreeHit: boolean;
}

const ScoreActionGrid: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [primaryAction, setPrimaryAction] = useState<ScoringActionType | null>(null);
  const [primaryRuns, setPrimaryRuns] = useState<number | null>(null);

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/score');
      setGameState(response.data);
    } catch (error) {
      console.error('Error fetching game state:', error);
      setErrorMessage('Failed to fetch game state');
    }
  };

  const handleAction = async (action: ScoringActionType, runs?: number) => {
    setErrorMessage(null);
    console.log('Action triggered:', action, runs);

    try {
      let response;

      if (action === 'newBall' || action === 'endBall') {
        response = await axios.post('http://localhost:3000/api/score', { action });
      } else if (['normal', 'wide'].includes(action)) {
        // Single action plays
        response = await axios.post('http://localhost:3000/api/score', { action, runs });
      } else if (primaryAction) {
        // Handling complex scenarios
        if (['bye', 'legBye'].includes(primaryAction) && action === 'overthrow') {
          response = await axios.post('http://localhost:3000/api/score', {
            action: primaryAction,
            runs: primaryRuns,
            secondaryAction: action,
            secondaryRuns: runs
          });
        } else if (primaryAction === 'noBall' && ['bye', 'legBye'].includes(action)) {
          response = await axios.post('http://localhost:3000/api/score', {
            action: primaryAction,
            secondaryAction: action,
            secondaryRuns: runs
          });
        } else {
          
          response = await axios.post('http://localhost:3000/api/score', {
            action: primaryAction,
            runs: primaryRuns
          });
        }
        setPrimaryAction(null);
        setPrimaryRuns(null);
      } else {
        
        setPrimaryAction(action);
        setPrimaryRuns(runs || 0);
        return; 
      }

      if (response && response.data) {
        setGameState(response.data);
      }
    } catch (error) {
      console.error('Error updating score:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <button
        onClick={() => handleAction('newBall')}
        className={`btn transition-colors duration-200 ${gameState.isNewBall ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 rounded`}
        disabled={gameState.isNewBall}
      >
        New Ball
      </button>

      {[0, 1, 2, 3, 4, 6].map((runs) => (
        <button
          key={runs}
          onClick={() => handleAction('normal', runs)}
          className="btn transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          disabled={!gameState.isNewBall}
        >
          {runs} Run{runs !== 1 ? 's' : ''}
        </button>
      ))}

      <button
        onClick={() => handleAction('wide', 0)}
        className="btn transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        disabled={!gameState.isNewBall}
      >
        Wide
      </button>

      {['noBall', 'bye', 'legBye'].map((extra) => (
        <button
          key={extra}
          onClick={() => handleAction(extra as ScoringActionType)}
          className="btn transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          disabled={!gameState.isNewBall}
        >
          {extra.charAt(0).toUpperCase() + extra.slice(1)}
        </button>
      ))}

      <button
        onClick={() => handleAction('wicket')}
        className="btn transition-colors duration-200 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded"
        disabled={!gameState.isNewBall || gameState.isFreeHit}
      >
        Wicket
      </button>

      <button
        onClick={() => handleAction('overthrow')}
        className="btn transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        disabled={!gameState.isNewBall}
      >
        Overthrow
      </button>

      <button
        onClick={() => handleAction('endBall')}
        className="btn transition-colors duration-200 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded"
        disabled={!gameState.isNewBall}
      >
        End Ball
      </button>

      {errorMessage && (
        <div className="text-red-500 mt-4 col-span-2 sm:col-span-4">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {primaryAction && (
        <div className="col-span-2 sm:col-span-4 mt-4">
          <p>Selected action: {primaryAction}</p>
          <p>Enter runs for {primaryAction}:</p>
          {[0, 1, 2, 3, 4, 6].map((runs) => (
            <button
              key={runs}
              onClick={() => handleAction(primaryAction, runs)}
              className="btn transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded mr-2"
            >
              {runs}
            </button>
          ))}
          {(primaryAction === 'noBall' || ['bye', 'legBye'].includes(primaryAction)) && (
            <>
              <p className="mt-2">Select secondary action:</p>
              {(['bye', 'legBye'].includes(primaryAction) ? ['overthrow'] : ['bye', 'legBye']).map((action) => (
                <button
                  key={action}
                  onClick={() => handleAction(action as ScoringActionType)}
                  className="btn transition-colors duration-200 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded mr-2 mt-2"
                >
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                </button>
              ))}
            </>
          )}
        </div>
      )}

      
    </div>
  );
};

export default ScoreActionGrid;