import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';

export default function PlayerControls() {
  const player = usePlayer();

  return (
    <View style={styles.container}>
      <Pressable style={styles.smallButton}>
        <Text style={styles.speedText}>1x</Text>
      </Pressable>

      <Pressable style={styles.skipButton} onPress={player.skipBack}>
        <Ionicons name="play-back" size={20} color={colors.primary} />
        <Text style={styles.skipLabel}>15</Text>
      </Pressable>

      <Pressable
        style={styles.playButton}
        onPress={() => player.isPlaying ? player.pause() : player.resume()}
      >
        <Ionicons
          name={player.isPlaying ? 'pause' : 'play'}
          size={32}
          color={colors.primary}
        />
      </Pressable>

      <Pressable style={styles.skipButton} onPress={player.skipForward}>
        <Ionicons name="play-forward" size={20} color={colors.primary} />
        <Text style={styles.skipLabel}>30</Text>
      </Pressable>

      <Pressable style={styles.smallButton}>
        <Ionicons name="moon-outline" size={20} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 16,
  },
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  skipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(107, 58, 42, 0.08)',
  },
  skipLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.primary,
    marginTop: -2,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(107, 58, 42, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
