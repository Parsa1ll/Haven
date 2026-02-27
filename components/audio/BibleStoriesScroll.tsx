import { View, Text, StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../../constants/theme';
import { AudioStory } from '../../data/audioStories';

interface Props {
  stories: AudioStory[];
  onPlay: (story: AudioStory) => void;
}

export default function BibleStoriesScroll({ stories, onPlay }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bible Stories</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable style={[styles.card, shadows.card]} onPress={() => onPlay(item)}>
            <ImageBackground
              source={item.thumbnail}
              style={styles.cardImage}
              imageStyle={{ borderRadius: radii.md }}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                style={[StyleSheet.absoluteFill, { borderRadius: radii.md }]}
              />
            </ImageBackground>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardRef}>{item.scriptureRef}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: colors.black,
    marginLeft: 20,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    width: 150,
  },
  cardImage: {
    width: 150,
    height: 120,
    borderRadius: radii.md,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  cardRef: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
});
