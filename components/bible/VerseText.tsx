import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';
import { BibleVerse } from '../../data/bible';

interface Props {
  verses: BibleVerse[];
  fontSize: number;
}

export default function VerseText({ verses, fontSize }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {verses.map(verse => (
        <View key={verse.number} style={styles.verseRow}>
          <Text style={[styles.verseNumber, { fontSize: fontSize - 4 }]}>
            {verse.number}{' '}
          </Text>
          <Text style={[styles.verseText, { fontSize, lineHeight: fontSize * 1.7 }]}>
            {verse.text}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  verseRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  verseNumber: {
    color: colors.gold,
    fontWeight: '600',
    marginTop: 2,
  },
  verseText: {
    flex: 1,
    color: colors.black,
    fontFamily: fonts.serifRegular,
  },
});
