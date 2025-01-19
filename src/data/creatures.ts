import { Creature } from '../types/game';

export const creatures: Creature[] = [
  {
    id: 1,
    name: 'Leafox',
    sprite: 'https://images.unsplash.com/photo-1520991888732-5a1fbd8aa468?w=64&h=64&fit=crop',
    health: 100,
    attack: 15,
    defense: 10,
    moves: [
      { name: 'Vine Whip', power: 20, accuracy: 90 },
      { name: 'Leaf Storm', power: 35, accuracy: 75 }
    ]
  },
  {
    id: 2,
    name: 'Aquadrake',
    sprite: 'https://images.unsplash.com/photo-1516512192916-a3d185892726?w=64&h=64&fit=crop',
    health: 95,
    attack: 20,
    defense: 8,
    moves: [
      { name: 'Water Pulse', power: 25, accuracy: 85 },
      { name: 'Tidal Wave', power: 40, accuracy: 70 }
    ]
  },
  {
    id: 3,
    name: 'Emberfox',
    sprite: 'https://images.unsplash.com/photo-1516512192916-a3d185892726?w=64&h=64&fit=crop',
    health: 90,
    attack: 25,
    defense: 5,
    moves: [
      { name: 'Flame Burst', power: 30, accuracy: 80 },
      { name: 'Inferno', power: 45, accuracy: 65 }
    ]
  }
];