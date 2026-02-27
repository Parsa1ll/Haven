import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii, shadows } from '../../constants/theme';
import { AudioStory } from '../../data/audioStories';

interface Props {
  story: AudioStory;
  onPlay: (story: AudioStory) => void;
}

export default function DailySuggestionCard({ story, onPlay }: Props) {
  return (
    <Pressable style={[styles.container, shadows.card]} onPress={() => onPlay(story)}>
      <ImageBackground
        source={story.thumbnail}
        style={styles.background}
        imageStyle={{ borderRadius: radii.lg }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
          style={[StyleSheet.absoluteFill, { borderRadius: radii.lg }]}
        />
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.reference}>{story.scriptureRef}</Text>
            <Text style={styles.label}>Daily Suggestion</Text>
          </View>
          <Pressable style={styles.playButton} onPress={() => onPlay(story)}>
            <Ionicons name="play" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: radii.lg,
    height: 180,
    marginBottom: 24,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 20,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.white,
    marginBottom: 4,
  },
  reference: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
