import { create } from 'zustand';

interface RecordState {
  recording: boolean;
  url: string | null;
  start: (canvas: HTMLCanvasElement, format?: 'webm' | 'mp4' | 'gif', quality?: 'high' | 'medium' | 'low') => void;
  stop: () => void;
}

export const useRecordStore = create<RecordState>((set, get) => {
  let recorder: MediaRecorder | null = null;
  let chunks: BlobPart[] = [];

  const getMimeType = (format: 'webm' | 'mp4' | 'gif') => {
    switch (format) {
      case 'webm':
        return 'video/webm;codecs=vp9';
      case 'mp4':
        return 'video/mp4';
      case 'gif':
        return 'video/webm'; // GIF wird später konvertiert
      default:
        return 'video/webm;codecs=vp9';
    }
  };

  const getQualitySettings = (quality: 'high' | 'medium' | 'low') => {
    switch (quality) {
      case 'high':
        return { videoBitsPerSecond: 8000000, audioBitsPerSecond: 128000 };
      case 'medium':
        return { videoBitsPerSecond: 4000000, audioBitsPerSecond: 96000 };
      case 'low':
        return { videoBitsPerSecond: 2000000, audioBitsPerSecond: 64000 };
      default:
        return { videoBitsPerSecond: 4000000, audioBitsPerSecond: 96000 };
    }
  };

  return {
    recording: false,
    url: null,
    start: async (canvas, format = 'webm', quality = 'medium') => {
      if (get().recording) return;
      
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const videoStream = canvas.captureStream(30);
        const combined = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);

        const mimeType = getMimeType(format);
        const qualitySettings = getQualitySettings(quality);

        recorder = new MediaRecorder(combined, { 
          mimeType,
          ...qualitySettings
        });
        
        chunks = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType });
          const url = URL.createObjectURL(blob);
          set({ url });
        };
        recorder.start();
        set({ recording: true, url: null });
      } catch (error) {
        console.error('Recording start error:', error);
        // Fallback zu WebM wenn das gewählte Format nicht unterstützt wird
        if (format !== 'webm') {
          console.log('Falling back to WebM format');
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const videoStream = canvas.captureStream(30);
          const combined = new MediaStream([
            ...videoStream.getVideoTracks(),
            ...audioStream.getAudioTracks(),
          ]);
          
          recorder = new MediaRecorder(combined, { 
            mimeType: 'video/webm;codecs=vp9',
            ...getQualitySettings(quality)
          });
          
          chunks = [];
          recorder.ondataavailable = (e) => chunks.push(e.data);
          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            set({ url });
          };
          recorder.start();
          set({ recording: true, url: null });
        }
      }
    },
    stop: () => {
      if (recorder && get().recording) {
        recorder.stop();
        set({ recording: false });
      }
    },
  };
}); 