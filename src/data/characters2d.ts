export interface SpriteCharacterDef {
  name: string;
  frames: string[]; // [closed, half, open]
  thumbnail: string;
}

export const spriteCharacters: SpriteCharacterDef[] = [
  {
    name: 'Alex',
    thumbnail: 'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=serious&backgroundColor=transparent',
    frames: [
      'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=serious&backgroundColor=transparent', // closed
      'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=smile&backgroundColor=transparent',   // half
      'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=screamOpen&backgroundColor=transparent', // open
    ],
  },
  {
    name: 'Maria',
    thumbnail: 'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=serious&backgroundColor=transparent',
    frames: [
      'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=serious&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=smile&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=screamOpen&backgroundColor=transparent',
    ],
  },
]; 