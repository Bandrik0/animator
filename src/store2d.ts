import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { SpriteCharacterDef } from './data/characters2d';

export interface Clip {
  id: string;
  url: string;
}

export interface SpriteInstance {
  id: string;
  def: SpriteCharacterDef;
  x: number;
  y: number;
  scale: number;
  clips: Clip[];
  audioLevel: number; // 0-1 current playing level
}

interface SpriteState {
  sprites: SpriteInstance[];
  addSprite: (def: SpriteCharacterDef) => string;
  updateSprite: (id: string, p: Partial<SpriteInstance>) => void;
  deleteSprite: (id: string) => void;
  addClip: (id: string, url: string) => void;
  deleteClip: (spriteId: string, clipId: string) => void;
  moveClip: (spriteId: string, clipId: string, direction: -1 | 1) => void;
  setAudioLevel: (id: string, level: number) => void;
  selectedId: string | null;
  select: (id: string | null) => void;
  background: string;
  setBackground: (url: string) => void;
}

export const useSpriteStore = create<SpriteState>((set) => ({
  sprites: [],
  addSprite: (def) => {
    const id = nanoid();
    const newSprite = {
      id,
      def,
      x: Math.max(400, (window.innerWidth - 480) / 2), // Account for both sidebars
      y: Math.max(300, (window.innerHeight - 120) / 2),
      scale: 1,
      clips: [],
      audioLevel: 0,
    };
    
    set((s) => ({
      sprites: [...s.sprites, newSprite],
    }));
    
    return id;
  },
  updateSprite: (id, p) =>
    set((s) => ({
      sprites: s.sprites.map((sp) => (sp.id === id ? { ...sp, ...p } : sp)),
    })),
  deleteSprite: (id) =>
    set((s) => ({
      sprites: s.sprites.filter((sp) => sp.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    })),
  addClip: (id, url) =>
    set((s) => ({
      sprites: s.sprites.map((sp) =>
        sp.id === id ? { ...sp, clips: [...sp.clips, { id: nanoid(), url }] } : sp
      ),
    })),
  deleteClip: (spriteId, clipId) =>
    set((s) => ({
      sprites: s.sprites.map((sp) =>
        sp.id === spriteId ? { ...sp, clips: sp.clips.filter((c) => c.id !== clipId) } : sp
      ),
    })),
  moveClip: (spriteId, clipId, dir) =>
    set((s) => ({
      sprites: s.sprites.map((sp) => {
        if (sp.id !== spriteId) return sp;
        const idx = sp.clips.findIndex((c) => c.id === clipId);
        if (idx === -1) return sp;
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= sp.clips.length) return sp;
        const newClips = [...sp.clips];
        const [clip] = newClips.splice(idx,1);
        newClips.splice(newIdx,0,clip);
        return { ...sp, clips: newClips };
      }),
    })),
  setAudioLevel: (id, level) =>
    set((s) => ({
      sprites: s.sprites.map((sp) => (sp.id === id ? { ...sp, audioLevel: level } : sp)),
    })),
  selectedId: null,
  select: (id) => set({ selectedId: id }),
  background: '',
  setBackground: (url) => set({ background: url }),
})); 