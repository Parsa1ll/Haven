import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { colors, fonts, radii } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';
import { mockChapters } from '../../data/bible';

export default function TranscriptionView() {

  const player = usePlayer();
  const verses = mockChapters['Genesis-1'].verses; // TODO: update to use correct chapter if available

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.handle} />
        <View style={styles.trackInfo}>
          {player.currentTrack && (
            <Image
              source={player.currentTrack.thumbnail}
              style={styles.thumbnail}
            />
          )}
          <View>
            <Text style={styles.title}>{player.currentTrack?.title || ''}</Text>
            <Text style={styles.subtitle}>{player.currentTrack?.scriptureRef || ''}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {verses.map(verse => (
          <Text
            key={verse.number}
            style={[
              styles.verseText,
              verse.number - 1 === player.currentVerseIndex && styles.activeVerse,
              verse.number - 1 !== player.currentVerseIndex && styles.dimmedVerse,
            ]}
          >
            <Text style={styles.verseNumber}>{verse.number} </Text>
            {verse.text}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.grayLight,
    marginBottom: 16,
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 18,
    color: colors.black,
  },
  subtitle: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16,
    color: colors.black,
  },
  activeVerse: {
    fontWeight: '700',
    opacity: 1,
  },
  dimmedVerse: {
    opacity: 0.4,
  },
  verseNumber: {
    fontSize: 12,
    color: colors.gold,
    fontWeight: '600',
  },
});
