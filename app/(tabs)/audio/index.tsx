import { Text, StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { colors, fonts } from '../../../constants/theme';
import { bibleStories } from '../../../data/audioStories';
import { audioTopics } from '../../../data/audioTopics';
import { usePlayer } from '../../../context/PlayerContext';
import DailySuggestionCard from '../../../components/audio/DailySuggestionCard';
import BibleStoriesScroll from '../../../components/audio/BibleStoriesScroll';
import TopicGridAudio from '../../../components/audio/TopicGridAudio';
import QueueList from '../../../components/audio/QueueList';

export default function AudioScreen() {
  const insets = useSafeAreaInsets();
  const player = usePlayer();

  const handlePlay = (story: typeof bibleStories[0]) => {
    player.play(story);
    player.addToQueue(story);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 10 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Haven</Text>
        <Pressable>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </Pressable>
      </View>

      <DailySuggestionCard story={bibleStories[1]} onPlay={handlePlay} />
      <BibleStoriesScroll stories={bibleStories} onPlay={handlePlay} />
      <TopicGridAudio topics={audioTopics} />
      <QueueList
        queue={player.queue}
        currentTrackId={player.currentTrack?.id}
        onPlay={handlePlay}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    color: colors.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
