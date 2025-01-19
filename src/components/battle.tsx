import React from 'react';
import { Creature } from '../types/game';
import { Zap, Shield, Heart } from 'lucide-react';

interface BattleProps {
  playerCreature: Creature;
  wildCreature: Creature;
  onAttack: (moveIndex: number) => void;
}

export const Battle: React.FC<BattleProps> = ({
  playerCreature,
  wildCreature,
  onAttack,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl max-w-2xl w-full shadow-2xl">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center transform hover:scale-105 transition-transform">
            <div className="relative">
              <img
                src={playerCreature.sprite}
                alt={playerCreature.name}
                className="w-32 h-32 mx-auto mb-4 rounded-2xl shadow-lg border-4 border-yellow-400"
              />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">🦊</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{playerCreature.name}</h3>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-white">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="font-bold">{playerCreature.health} HP</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 text-white">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>{playerCreature.attack}</span>
                <Shield className="w-5 h-5 text-blue-400 ml-2" />
                <span>{playerCreature.defense}</span>
              </div>
            </div>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform">
            <div className="relative">
              <img
                src={wildCreature.sprite}
                alt={wildCreature.name}
                className="w-32 h-32 mx-auto mb-4 rounded-2xl shadow-lg border-4 border-purple-400"
              />
              <span className="absolute -top-2 -right-2 bg-purple-400 text-purple-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{wildCreature.name}</h3>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-white">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="font-bold">{wildCreature.health} HP</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 text-white">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>{wildCreature.attack}</span>
                <Shield className="w-5 h-5 text-blue-400 ml-2" />
                <span>{wildCreature.defense}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {playerCreature.moves.map((move, index) => (
            <button
              key={move.name}
              onClick={() => onAttack(index)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <div className="font-bold text-lg">{move.name} ⚔️</div>
              <div className="text-sm opacity-90">
                Power: {move.power} 🔥 | Accuracy: {move.accuracy} 🎯
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};