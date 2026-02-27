import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { AudioStory } from '../data/audioStories';

interface PlayerState {
  currentTrack: AudioStory | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  showTranscription: boolean;
  currentVerseIndex: number;
  queue: AudioStory[];
}

interface PlayerContextValue extends PlayerState {
  play: (track: AudioStory) => void;
  pause: () => void;
  resume: () => void;
  seekTo: (progress: number) => void;
  skipForward: () => void;
  skipBack: () => void;
  toggleTranscription: () => void;
  addToQueue: (track: AudioStory) => void;
  removeFromQueue: (trackId: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    showTranscription: false,
    currentVerseIndex: 0,
    queue: [],
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback((duration: number) => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setState(prev => {
        const newTime = prev.currentTime + 1;
        if (newTime >= prev.duration) {
          clearTimer();
          return { ...prev, currentTime: prev.duration, progress: 1, isPlaying: false };
        }
        const newVerseIndex = Math.floor(newTime / 4) % 31;
        return {
          ...prev,
          currentTime: newTime,
          progress: newTime / prev.duration,
          currentVerseIndex: newVerseIndex,
        };
      });
    }, 1000);
  }, [clearTimer]);

  const play = useCallback((track: AudioStory) => {
    clearTimer();
    setState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      currentTime: 0,
      duration: track.durationSeconds,
      currentVerseIndex: 0,
      showTranscription: false,
    }));
    startTimer(track.durationSeconds);
  }, [clearTimer, startTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, [clearTimer]);

  const resume = useCallback(() => {
    setState(prev => {
      if (prev.currentTrack && !prev.isPlaying) {
        startTimer(prev.duration);
        return { ...prev, isPlaying: true };
      }
      return prev;
    });
  }, [startTimer]);

  const seekTo = useCallback((progress: number) => {
    setState(prev => {
      const newTime = progress * prev.duration;
      return { ...prev, progress, currentTime: newTime };
    });
  }, []);

  const skipForward = useCallback(() => {
    setState(prev => {
      const newTime = Math.min(prev.currentTime + 30, prev.duration);
      return { ...prev, currentTime: newTime, progress: newTime / prev.duration };
    });
  }, []);

  const skipBack = useCallback(() => {
    setState(prev => {
      const newTime = Math.max(prev.currentTime - 15, 0);
      return { ...prev, currentTime: newTime, progress: newTime / prev.duration };
    });
  }, []);

  const toggleTranscription = useCallback(() => {
    setState(prev => ({ ...prev, showTranscription: !prev.showTranscription }));
  }, []);

  const addToQueue = useCallback((track: AudioStory) => {
    setState(prev => ({
      ...prev,
      queue: prev.queue.some(t => t.id === track.id) ? prev.queue : [track, ...prev.queue],
    }));
  }, []);

  const removeFromQueue = useCallback((trackId: string) => {
    setState(prev => ({
      ...prev,
      queue: prev.queue.filter(t => t.id !== trackId),
    }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        play,
        pause,
        resume,
        seekTo,
        skipForward,
        skipBack,
        toggleTranscription,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
