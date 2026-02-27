import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../constants/theme';
import { getDailyVerse } from '../data/verses';

export default function DailyVerseScreen() {
  const insets = useSafeAreaInsets();
  const verse = getDailyVerse();

  return (
    <Pressable style={{ flex: 1 }} onPress={() => router.replace('/(tabs)')}>
      <ImageBackground
        source={require('../assets/images/Gemini_Generated_Image_v7p0kmv7p0kmv7p0.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.content, { paddingTop: insets.top }]}>
          <Text style={styles.title}>Haven</Text>

          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>
              {'\u201C'}{verse.text}{'\u201D'}
            </Text>
            <Text style={styles.reference}>{verse.reference.toUpperCase()}</Text>
          </View>

          <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.shareButton}>
              <Text style={styles.shareText}>Share to story</Text>
              <Text style={styles.shareIcon}>  +</Text>
            </View>
            <Text style={styles.tapText}>Or, tap anywhere to continue</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: fonts.serifRegular,
    fontSize: 28,
    color: colors.white,
    marginTop: 20,
  },
  verseContainer: {
    alignItems: 'center',
  },
  verseText: {
    fontFamily: fonts.serifBold,
    fontSize: 30,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 42,
  },
  reference: {
    fontSize: 14,
    color: colors.white,
    letterSpacing: 2,
    marginTop: 20,
    fontWeight: '500',
  },
  bottomSection: {
    alignItems: 'center',
    width: '100%',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
  },
  shareText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  shareIcon: {
    fontSize: 18,
    color: colors.white,
  },
  tapText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 16,
  },
});
