import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../../constants/theme';
import { AudioTopic } from '../../data/audioTopics';

interface Props {
  topics: AudioTopic[];
}

export default function TopicGridAudio({ topics }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bible Topics</Text>
      <View style={styles.grid}>
        {topics.map(topic => (
          <Pressable
            key={topic.id}
            style={[styles.card, shadows.card]}
            onPress={() => router.push(`/(tabs)/audio/${topic.id}`)}
          >
            <ImageBackground
              source={topic.thumbnail}
              style={styles.cardImage}
              imageStyle={{ borderRadius: radii.lg }}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                style={[StyleSheet.absoluteFill, { borderRadius: radii.lg }]}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{topic.title}</Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    height: 140,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
});
