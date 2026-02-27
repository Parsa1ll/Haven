import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime, formatTimeRemaining } from '../../utils/formatTime';
import PlayerControls from './PlayerControls';
import TranscriptionView from './TranscriptionView';

interface Props {
  onClose: () => void;
}

export default function ExpandedPlayer({ onClose }: Props) {
  const insets = useSafeAreaInsets();
  const player = usePlayer();

  if (!player.currentTrack) return null;


  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}> 
      {/* Top bar removed as requested */}

      {player.showTranscription ? (
        <TranscriptionView />
      ) : (
        <View style={styles.artSection}>
          {/* Only show the current track's image */}
          <View style={styles.albumArt}>
            <Image
              source={player.currentTrack.thumbnail}
              style={styles.artMain}
            />
          </View>

          <Text style={styles.trackTitle}>{player.currentTrack.title}</Text>
          <Text style={styles.trackSubtitle}>{player.currentTrack.scriptureRef}</Text>
        </View>
      )}

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${player.progress * 100}%` }]} />
          <View style={[styles.progressDot, { left: `${player.progress * 100}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(player.currentTime)}</Text>
          <Text style={styles.timeText}>{formatTimeRemaining(player.currentTime, player.duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <PlayerControls />

      {/* Volume */}
      <View style={styles.volumeRow}>
        <Ionicons name="volume-low" size={18} color={colors.gray} />
        <View style={styles.volumeBar}>
          <View style={[styles.volumeFill, { width: '60%' }]} />
        </View>
        <Ionicons name="volume-high" size={18} color={colors.gray} />
      </View>

      {/* Bottom icons */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable
          style={styles.bottomIcon}
          onPress={player.toggleTranscription}
        >
          <Ionicons
            name="document-text-outline"
            size={22}
            color={player.showTranscription ? colors.primary : colors.gray}
          />
        </Pressable>
        <Pressable style={styles.bottomIcon}>
          <Ionicons name="options-outline" size={22} color={colors.gray} />
        </Pressable>
        <Pressable style={styles.bottomIcon} onPress={onClose}>
          <Ionicons name="list-outline" size={22} color={colors.gray} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fontButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  bookPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  bookPillText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
  },
  chapterBadge: {
    backgroundColor: colors.grayLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  chapterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  albumArt: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: 20,
  },
  artMain: {
    width: '100%',
    flex: 2,
  },
  artBottom: {
    flexDirection: 'row',
    flex: 1,
  },
  artSmall: {
    flex: 1,
  },
  trackTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.black,
  },
  trackSubtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  progressSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressDot: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: colors.gray,
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 8,
  },
  volumeBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    borderRadius: 2,
  },
  volumeFill: {
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  bottomIcon: {
    padding: 12,
  },
});
