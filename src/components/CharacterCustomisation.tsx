import React from 'react';
import { PlayerAppearance } from '../types/game';
import { Paintbrush, Square, Circle, Triangle, Sparkles, Flame } from 'lucide-react';

interface CharacterCustomizerProps {
  appearance: PlayerAppearance;
  onAppearanceChange: (newAppearance: PlayerAppearance) => void;
}

export const CharacterCustomizer: React.FC<CharacterCustomizerProps> = ({
  appearance,
  onAppearanceChange,
}) => {
  const colors = ['#FF4D4D', '#4DFF4D', '#4D4DFF', '#FFD700', '#FF69B4', '#9370DB'];
  const shapes = ['circle', 'square', 'triangle'] as const;

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Paintbrush className="w-5 h-5" />
        Customize Character
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-white text-sm mb-2 block">Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onAppearanceChange({ ...appearance, color })}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                  appearance.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-purple-900' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-white text-sm mb-2 block">Shape</label>
          <div className="flex gap-2">
            {shapes.map((shape) => (
              <button
                key={shape}
                onClick={() => onAppearanceChange({ ...appearance, shape })}
                className={`p-2 rounded-lg transition-all ${
                  appearance.shape === shape
                    ? 'bg-white bg-opacity-30 text-white'
                    : 'text-white text-opacity-60 hover:text-opacity-100'
                }`}
              >
                {shape === 'circle' && <Circle />}
                {shape === 'square' && <Square />}
                {shape === 'triangle' && <Triangle />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-white text-sm mb-2 block">Size</label>
          <input
            type="range"
            min="10"
            max="25"
            value={appearance.size}
            onChange={(e) =>
              onAppearanceChange({ ...appearance, size: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={appearance.trail}
              onChange={(e) =>
                onAppearanceChange({ ...appearance, trail: e.target.checked })
              }
              className="rounded border-gray-300"
            />
            <Flame className="w-4 h-4" /> Trail Effect
          </label>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={appearance.glowing}
              onChange={(e) =>
                onAppearanceChange({ ...appearance, glowing: e.target.checked })
              }
              className="rounded border-gray-300"
            />
            <Sparkles className="w-4 h-4" /> Glow Effect
          </label>
        </div>
      </div>
    </div>
  );
};