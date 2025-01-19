
import './App.css'
import  { useState, useCallback } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { Battle } from './components/battle';
import { CharacterCustomizer } from './components/CharacterCustomisation';
import { GameState, Position, Creature, PlayerAppearance } from './types/game';
import { creatures } from './data/creatures';
import { Sword, Sparkles } from 'lucide-react';
function App() {
    const [gameState, setGameState] = useState<GameState>({
      player: {
        position: { x: 10, y: 7 },
        creatures: [creatures[0]],
        activeCreature: 0,
        appearance: {
          color: '#4DFF4D',
          shape: 'circle',
          size: 16,
          trail: false,
          glowing: true
        }
      },
      map: Array(15).fill(Array(20).fill(0)),
      inBattle: false
    });
  
    const handleMove = useCallback((newPosition: Position) => {
      setGameState(prev => {
        if (Math.random() < 0.2 && !prev.inBattle) {
          const randomCreature = creatures[Math.floor(Math.random() * creatures.length)];
          return {
            ...prev,
            player: {
              ...prev.player,
              position: newPosition
            },
            inBattle: true,
            wildCreature: { ...randomCreature }
          };
        }
  
        return {
          ...prev,
          player: {
            ...prev.player,
            position: newPosition
          }
        };
      });
    }, []);
  
    const handleAttack = useCallback((moveIndex: number) => {
      setGameState(prev => {
        if (!prev.wildCreature) return prev;
  
        const playerMove = prev.player.creatures[prev.player.activeCreature].moves[moveIndex];
        const damage = Math.floor(playerMove.power * (Math.random() * 0.3 + 0.85));
        
        const updatedWildCreature = {
          ...prev.wildCreature,
          health: Math.max(0, prev.wildCreature.health - damage)
        };
  
        if (updatedWildCreature.health === 0) {
          return {
            ...prev,
            inBattle: false,
            wildCreature: undefined
          };
        }
  
        return {
          ...prev,
          wildCreature: updatedWildCreature
        };
      });
    }, []);
  
    const handleAppearanceChange = (newAppearance: PlayerAppearance) => {
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          appearance: newAppearance
        }
      }));
    };
  
    return (
      <div className="min-h-screen  bg-gradient-to-b from-blue-900 to-purple-900 flex flex-col items-center justify-center p-2">
        <div className="text-center mb-8 animate-bounce">
          <h1 className="text-5xl font-bold text-white flex items-center justify-center gap-3">
            <Sword className="w-8 h-8 text-yellow-400" />
            Crystal Creatures
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h1>
          <p className="text-yellow-200 mt-2 text-xl">✨ Explore the world and collect magical creatures! 🌟</p>
        </div>
  
        <div className="flex gap-8 items-start">
          <div className="relative">
            <GameCanvas
              playerPosition={gameState.player.position}
              playerAppearance={gameState.player.appearance}
              onMove={handleMove}
            />
  
            {gameState.inBattle && gameState.wildCreature && (
              <Battle
                playerCreature={gameState.player.creatures[gameState.player.activeCreature]}
                wildCreature={gameState.wildCreature}
                onAttack={handleAttack}
              />
            )}
          </div>
  
          <CharacterCustomizer
            appearance={gameState.player.appearance}
            onAppearanceChange={handleAppearanceChange}
          />
        </div>
  {/* how to play */}
        <div className="mt-8 bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm text-white max-w-md">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🎮</span> How to Play
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span>⬆️</span> Use arrow keys to move around
            </li>
            <li className="flex items-center gap-2">
              <span>🔥</span> Find and battle magical creatures
            </li>
            <li className="flex items-center gap-2">
              <span>⚔️</span> Use powerful moves in battle
            </li>
            <li className="flex items-center gap-2">
              <span>🏆</span> Defeat creatures to win!
            </li>
          </ul>
        </div>


    </div>
  )
}

export default App
