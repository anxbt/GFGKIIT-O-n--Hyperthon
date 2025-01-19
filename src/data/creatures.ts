import { Creature } from '../types/game';

export const creatures: Creature[] = [
  {
    id: 1,
    name: 'Leafox',
    sprite: 'https://cdn.dribbble.com/users/817492/screenshots/5934725/media/48bceb239225280d634107db40a0d16c.jpg?w=64&h=64&fit=crop',
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
    sprite: 'https://makepix.b-cdn.net/makepix_ed16c91b-dfd4-4019-82a1-86eb880c2a8d/type-water-appearance-aquabble-612e4000_0_m.webp?w=64&h=64&fit=crop',
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
    sprite: 'https://archives.bulbagarden.net/media/upload/4/46/0653Fennekin.png',
    health: 90,
    attack: 25,
    defense: 5,
    moves: [
      { name: 'Flame Burst', power: 30, accuracy: 80 },
      { name: 'Inferno', power: 45, accuracy: 65 }
    ]
  }
];