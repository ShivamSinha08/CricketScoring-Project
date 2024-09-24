import React from 'react';
import { useGame } from './GameContext';
import { FaRegCommentDots } from 'react-icons/fa';

const Commentary: React.FC = () => {
  const { gameState } = useGame();

  if (!gameState) {
    return null;
  }

  
  const reversedCommentary = [...gameState.commentary].reverse();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4 border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
        <FaRegCommentDots className="text-blue-500" />
        <span>Live Commentary</span>
      </h2>

      <div className="max-h-48 overflow-y-auto space-y-3">
        {reversedCommentary.map((comment, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
            }`}
          >
            <p className="text-gray-700 text-sm">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentary;