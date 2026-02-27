import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '../../constants/theme';
import { AudioStory } from '../../data/audioStories';

interface Props {
  queue: AudioStory[];
  currentTrackId?: string | null;
  onPlay: (story: AudioStory) => void;
}

export default function QueueList({ queue, currentTrackId, onPlay }: Props) {
  if (queue.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Listening Queue</Text>
      {queue.map(item => (
        <Pressable key={item.id} style={styles.row} onPress={() => onPlay(item)}>
          <Image source={item.thumbnail} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.ref}>{item.scriptureRef}</Text>
            {currentTrackId === item.id && (
              <Text style={styles.playing}>Currently Playing</Text>
            )}
          </View>
          <Ionicons name="menu" size={22} color={colors.gray} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: colors.black,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: radii.sm,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  ref: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  playing: {
    fontSize: 12,
    color: colors.gold,
    fontWeight: '500',
    marginTop: 2,
  },
});
