import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii, shadows } from '../../constants/theme';
import { getDailyVerse } from '../../data/verses';

export default function DailyVerseCard() {
  const verse = getDailyVerse();
  const today = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <View style={[styles.container, shadows.card]}>
      <ImageBackground
        source={require('../../assets/images/Gemini_Generated_Image_rpnhhrpnhhrpnhhr.png')}
        style={styles.background}
        imageStyle={{ borderRadius: radii.lg }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={[StyleSheet.absoluteFill, { borderRadius: radii.lg }]}
        />
        <View style={styles.content}>
          <Text style={styles.label}>
            Daily Verse · {monthNames[today.getMonth()]} {today.getDate()}
          </Text>
          <Text style={styles.verseText}>
            {'\u201C'}{verse.text}{'\u201D'}
          </Text>
          <Text style={styles.reference}>{verse.reference}</Text>

          <View style={styles.actions}>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionText}>Interpret</Text>
              <Ionicons name="play" size={14} color={colors.white} />
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionText}>Share</Text>
              <Ionicons name="share-social" size={14} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: radii.lg,
    marginBottom: 24,
  },
  background: {
    minHeight: 200,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    textAlign: 'center',
  },
  verseText: {
    fontFamily: fonts.serifRegular,
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 26,
  },
  reference: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    borderRadius: radii.sm,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
});
