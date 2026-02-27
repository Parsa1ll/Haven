import { View, Text, StyleSheet, Pressable, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, shadows } from '../../constants/theme';

interface Topic {
  id: string;
  title: string;
  thumbnail: ImageSourcePropType;
}

const topics: Topic[] = [
  {
    id: 'life-challenges',
    title: 'Life challenges',
    thumbnail: require('../../assets/images/Gemini_Generated_Image_os6kg2os6kg2os6k.png'),
  },
  {
    id: 'questions-faith',
    title: 'Questions of faith',
    thumbnail: require('../../assets/images/Gemini_Generated_Image_3ewsjx3ewsjx3ews.png'),
  },
  {
    id: 'prayer',
    title: 'Prayer',
    thumbnail: require('../../assets/images/Gemini_Generated_Image_ukuq2wukuq2wukuq.png'),
  },
  {
    id: 'wisdom',
    title: 'Wisdom',
    thumbnail: require('../../assets/images/Gemini_Generated_Image_qsgxj9qsgxj9qsgx.png'),
  },
];

export default function TopicGrid() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {topics.map(topic => (
          <Pressable key={topic.id} style={[styles.card, shadows.card]}>
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
    marginBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    height: 160,
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
  },
});
