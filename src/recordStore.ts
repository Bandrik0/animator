import { create } from 'zustand';

interface RecordState {
  recording: boolean;
  url: string | null;
  start: (canvas: HTMLCanvasElement) => void;
  stop: () => void;
}

export const useRecordStore = create<RecordState>((set, get) => {
  let recorder: MediaRecorder | null = null;
  let chunks: BlobPart[] = [];

  return {
    recording: false,
    url: null,
    start: async (canvas) => {
      if (get().recording) return;
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const videoStream = canvas.captureStream(30);
      const combined = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);
      recorder = new MediaRecorder(combined, { mimeType: 'video/webm' });
      chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        set({ url });
      };
      recorder.start();
      set({ recording: true, url: null });
    },
    stop: () => {
      if (recorder && get().recording) {
        recorder.stop();
        set({ recording: false });
      }
    },
  };
}); 