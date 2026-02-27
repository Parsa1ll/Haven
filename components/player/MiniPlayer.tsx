import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';
import ExpandedPlayer from './ExpandedPlayer';

export default function MiniPlayer() {
  const player = usePlayer();
  const [showExpanded, setShowExpanded] = useState(false);

  if (!player.currentTrack) return null;

  return (
    <>
      <Pressable style={styles.container} onPress={() => setShowExpanded(true)}>
        <BlurView intensity={80} tint="light" style={styles.blur}>
          <View style={styles.content}>
            <Image
              source={player.currentTrack.thumbnail}
              style={styles.thumbnail}
            />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {player.currentTrack.title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {player.currentTrack.scriptureRef}
              </Text>
            </View>
            <Pressable
              style={styles.playPause}
              onPress={(e) => {
                e.stopPropagation?.();
                player.isPlaying ? player.pause() : player.resume();
              }}
            >
              <Ionicons
                name={player.isPlaying ? 'pause' : 'play'}
                size={22}
                color={colors.primary}
              />
            </Pressable>
            <Pressable style={styles.timerButton}>
              <Ionicons name="timer-outline" size={20} color={colors.primary} />
            </Pressable>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${player.progress * 100}%` }]}
            />
          </View>
        </BlurView>
      </Pressable>

      <Modal
        visible={showExpanded}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowExpanded(false)}
      >
        <ExpandedPlayer onClose={() => setShowExpanded(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 8,
    right: 8,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  blur: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: radii.sm,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 1,
  },
  playPause: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
  },
  progressFill: {
    height: 2,
    backgroundColor: colors.primary,
  },
});
