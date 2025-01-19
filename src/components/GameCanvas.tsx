import React, { useRef, useEffect } from 'react';
import { Position, PlayerAppearance } from '../types/game';

interface GameCanvasProps {
  playerPosition: Position;
  playerAppearance: PlayerAppearance;
  onMove: (newPosition: Position) => void;
}

const TILE_SIZE = 32;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;

const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  appearance: PlayerAppearance
) => {
  ctx.save();
  
  // Draw trail effect if enabled
  if (appearance.trail) {
    ctx.shadowColor = appearance.color;
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Draw glow effect if enabled
  if (appearance.glowing) {
    ctx.beginPath();
    ctx.arc(
      x * TILE_SIZE + TILE_SIZE / 2,
      y * TILE_SIZE + TILE_SIZE / 2,
      appearance.size * 1.5,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = appearance.color + '40'; // Add transparency
    ctx.fill();
  }

  // Draw the player shape
  ctx.fillStyle = appearance.color;
  switch (appearance.shape) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(
        x * TILE_SIZE + TILE_SIZE / 2,
        y * TILE_SIZE + TILE_SIZE / 2,
        appearance.size,
        0,
        Math.PI * 2
      );
      ctx.fill();
      break;
    case 'square':
      const offset = (TILE_SIZE - appearance.size) / 2;
      ctx.fillRect(
        x * TILE_SIZE + offset,
        y * TILE_SIZE + offset,
        appearance.size,
        appearance.size
      );
      break;
    case 'triangle':
      ctx.beginPath();
      const centerX = x * TILE_SIZE + TILE_SIZE / 2;
      const centerY = y * TILE_SIZE + TILE_SIZE / 2;
      ctx.moveTo(centerX, centerY - appearance.size / 2);
      ctx.lineTo(centerX - appearance.size / 2, centerY + appearance.size / 2);
      ctx.lineTo(centerX + appearance.size / 2, centerY + appearance.size / 2);
      ctx.closePath();
      ctx.fill();
      break;
  }

  ctx.restore();
};

export const GameCanvas: React.FC<GameCanvasProps> = ({
  playerPosition,
  playerAppearance,
  onMove,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grass pattern background
    const pattern = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    pattern.addColorStop(0, '#2d5a27');
    pattern.addColorStop(1, '#1e4d2b');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern
    ctx.strokeStyle = '#ffffff10';
    ctx.lineWidth = 1;
    for (let i = 0; i <= MAP_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * TILE_SIZE, 0);
      ctx.lineTo(i * TILE_SIZE, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= MAP_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * TILE_SIZE);
      ctx.lineTo(canvas.width, i * TILE_SIZE);
      ctx.stroke();
    }

    // Draw player
    drawPlayer(ctx, playerPosition.x, playerPosition.y, playerAppearance);
  }, [playerPosition, playerAppearance]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const newPosition = { ...playerPosition };

    switch (e.key) {
      case 'ArrowUp':
        if (newPosition.y > 0) newPosition.y--;
        break;
      case 'ArrowDown':
        if (newPosition.y < MAP_HEIGHT - 1) newPosition.y++;
        break;
      case 'ArrowLeft':
        if (newPosition.x > 0) newPosition.x--;
        break;
      case 'ArrowRight':
        if (newPosition.x < MAP_WIDTH - 1) newPosition.x++;
        break;
    }

    onMove(newPosition);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  return (
    <canvas
      ref={canvasRef}
      width={MAP_WIDTH * TILE_SIZE}
      height={MAP_HEIGHT * TILE_SIZE}
      className="border-4 border-indigo-900 rounded-lg shadow-2xl"
    />
  );
};