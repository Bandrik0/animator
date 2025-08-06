export interface SpriteCharacterDef {
  name: string;
  frames: string[]; // [closed, half, open]
  thumbnail: string;
  type: 'avatar' | 'animated' | 'robot';
  animated?: boolean;
  characterType?: 'bob' | 'lisa' | 'robot';
}

export const spriteCharacters: SpriteCharacterDef[] = [
  {
    name: 'Alex',
    type: 'avatar',
    thumbnail: 'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=serious&backgroundColor=transparent',
    frames: [
      'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=serious&backgroundColor=transparent', // closed
      'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=smile&backgroundColor=transparent',   // half
      'https://api.dicebear.com/9.x/avataaars/png?seed=Alex&mouth=screamOpen&backgroundColor=transparent', // open
    ],
  },
  {
    name: 'Maria',
    type: 'avatar',
    thumbnail: 'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=serious&backgroundColor=transparent',
    frames: [
      'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=serious&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=smile&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/avataaars/png?seed=Maria&mouth=screamOpen&backgroundColor=transparent',
    ],
  },
  {
    name: 'Bob',
    type: 'animated',
    animated: true,
    characterType: 'bob',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9IiM0QTAwRTIiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI1IiBmaWxsPSIjMkMzRTAwIi8+PGNpcmNsZSBjeD0iNjAiIGN5PSI0MCIgcj0iNSIgZmlsbD0iIzJDM0UwMCIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjU1IiByeD0iOCIgcnk9IjMiIGZpbGw9IiNFNzRDM0MiLz48L3N2Zz4=',
    frames: ['bob-1', 'bob-2', 'bob-3'],
  },
  {
    name: 'Lisa',
    type: 'animated',
    animated: true,
    characterType: 'lisa',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzUiIGZpbGw9IiNFOTFFNjMiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI1IiBmaWxsPSIjMkMzRTAwIi8+PGNpcmNsZSBjeD0iNjAiIGN5PSI0MCIgcj0iNSIgZmlsbD0iIzJDM0UwMCIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjU1IiByeD0iOCIgcnk9IjMiIGZpbGw9IiNFNzRDM0MiLz48L3N2Zz4=',
    frames: ['lisa-1', 'lisa-2', 'lisa-3'],
  },
  {
    name: 'Robot Max',
    type: 'robot',
    animated: true,
    characterType: 'robot',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMjAiIHk9IjMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiM2MDdEOEIiIHN0cm9rZT0iIzQ1NUE2NCIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iNDUiIHI9IjQiIGZpbGw9IiMwMEJDRDQiLz48Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSI0IiBmaWxsPSIjMDBDQ0Q0Ii8+PHJlY3QgeD0iNDAiIHk9IjU1IiB3aWR0aD0iMjAiIGhlaWdodD0iNSIgZmlsbD0iI0ZGNzIyIi8+PC9zdmc+',
    frames: ['robot-1', 'robot-2', 'robot-3'],
  },
]; 