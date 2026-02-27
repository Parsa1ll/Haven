
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../constants/theme';
import { AudioStory } from '../../data/audioStories';
import { usePlayer } from '../../context/PlayerContext';

interface Props {
  episode: AudioStory;
  onPlay: (episode: AudioStory) => void;
}

export default function EpisodeRow({ episode, onPlay }: Props) {
  const player = usePlayer();
  const isCurrent = player.currentTrack?.id === episode.id;

  return (
    <View style={styles.row}>
      <Image source={episode.thumbnail} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.ref}>{episode.scriptureRef}</Text>
        <Text style={styles.duration}>{episode.duration}</Text>
      </View>
      <Pressable style={styles.playButton} onPress={() => onPlay(episode)}>
        <Ionicons
          name={isCurrent && player.isPlaying ? 'pause' : 'play'}
          size={20}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: radii.sm,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  ref: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    marginTop: 2,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
