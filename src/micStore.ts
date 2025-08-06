import { create } from 'zustand';

interface MicState {
  level: number;
  enabled: boolean;
  setLevel: (l: number) => void;
  setEnabled: (e: boolean) => void;
}

export const useMicStore = create<MicState>((set) => ({
  level: 0,
  enabled: false,
  setLevel: (l) => set({ level: l }),
  setEnabled: (e) => set({ enabled: e }),
})); 