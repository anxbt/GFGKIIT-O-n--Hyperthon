export interface Position {
    x: number;
    y: number;
  }
  
  export interface Creature {
    id: number;
    name: string;
    sprite: string;
    health: number;
    attack: number;
    defense: number;
    moves: Move[];
  }
  
  export interface Move {
    name: string;
    power: number;
    accuracy: number;
  }
  
  export interface Player {
    position: Position;
    creatures: Creature[];
    activeCreature: number;
    appearance: PlayerAppearance;
  }
  
  export interface PlayerAppearance {
    color: string;
    shape: 'circle' | 'square' | 'triangle';
    size: number;
    trail: boolean;
    glowing: boolean;
  }
  
  export interface GameState {
    player: Player;
    map: number[][];
    inBattle: boolean;
    wildCreature?: Creature;
  }