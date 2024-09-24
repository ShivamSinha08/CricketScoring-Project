import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
  currentBatsmen: {
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
  }[];
  currentBowler: {
    name: string;
    overs: number;
    balls: number;
    runsConceded: number;
    wickets: number;
  };
  commentary: string[];
}

interface GameContextType {
  gameState: GameState | null;
  fetchGameState: () => Promise<void>;
  handleAction: (action: string, runs?: number) => Promise<void>;
  errorMessage: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchGameState = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/score');
      setGameState(response.data);
    } catch (error) {
      console.error('Error fetching game state:', error);
      setErrorMessage('Failed to fetch game state');
    }
  };

  const handleAction = async (action: string, runs?: number) => {
    setErrorMessage(null);
    try {
      const response = await axios.post('http://localhost:3000/api/score', {
        action,
        runs,
      });
      setGameState(response.data);
    } catch (error) {
      console.error('Error updating score:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchGameState();
    const intervalId = setInterval(fetchGameState, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <GameContext.Provider value={{ gameState, fetchGameState, handleAction, errorMessage }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};