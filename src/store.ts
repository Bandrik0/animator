import { create } from 'zustand';
import { nanoid } from 'nanoid';

export interface CharacterInstance {
  id: string;
  url: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

interface StoreState {
  characters: CharacterInstance[];
  addCharacter: (url: string, name: string) => void;
  updateCharacter: (id: string, partial: Partial<CharacterInstance>) => void;
  removeCharacter: (id: string) => void;
  selectedId: string | null;
  selectCharacter: (id: string | null) => void;
  environment: string;
  setEnvironment: (env: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  characters: [],
  addCharacter: (url, name) =>
    set((state) => ({
      characters: [
        ...state.characters,
        {
          id: nanoid(),
          url,
          name,
          position: [Math.random() * 2 - 1, 0, Math.random() * -2],
          rotation: [0, 0, 0],
          scale: 1,
        },
      ],
    })),
  updateCharacter: (id, partial) =>
    set((state) => ({
      characters: state.characters.map((c) =>
        c.id === id ? { ...c, ...partial } : c
      ),
    })),
  removeCharacter: (id) =>
    set((state) => ({
      characters: state.characters.filter((c) => c.id !== id),
    })),

  selectedId: null,
  selectCharacter: (id) => set({ selectedId: id }),

  environment: 'sunset',
  setEnvironment: (env) => set({ environment: env }),
})); 