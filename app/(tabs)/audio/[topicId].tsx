import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../../constants/theme';
import { audioTopics } from '../../../data/audioTopics';
import { usePlayer } from '../../../context/PlayerContext';
import EpisodeRow from '../../../components/audio/EpisodeRow';

export default function TopicDetailScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const insets = useSafeAreaInsets();
  const player = usePlayer();

  const topic = audioTopics.find(t => t.id === topicId);

  if (!topic) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text>Topic not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Haven</Text>
        <Pressable>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </Pressable>
      </View>

      <FlatList
        data={topic.episodes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.topicTitle}>{topic.title}</Text>
        }
        renderItem={({ item }) => (
          <EpisodeRow
            episode={item}
            onPlay={(ep) => {
              player.play(ep);
              player.addToQueue(ep);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.primary,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  topicTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 24,
    color: colors.black,
    marginBottom: 16,
  },
});
