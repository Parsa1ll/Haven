import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '../../constants/theme';
import { getChapter, mockChapters } from '../../data/bible';
import BookChapterSelector from '../../components/bible/BookChapterSelector';
import VerseText from '../../components/bible/VerseText';

export default function BibleScreen() {
  const insets = useSafeAreaInsets();
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [showFontControls, setShowFontControls] = useState(false);

  const chapterData = getChapter(book, chapter);
  const fallbackKey = Object.keys(mockChapters)[0];
  const verses = chapterData?.verses || mockChapters[fallbackKey].verses;

  const handleSelect = (newBook: string, newChapter: number) => {
    setBook(newBook);
    setChapter(newChapter);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.toolbar}>
        <Pressable
          style={styles.fontButton}
          onPress={() => setShowFontControls(!showFontControls)}
        >
          <Text style={styles.fontButtonText}>Aa</Text>
        </Pressable>

        <BookChapterSelector
          book={book}
          chapter={chapter}
          onSelect={handleSelect}
        />

        <Pressable style={styles.playButton}>
          <Ionicons name="play" size={18} color={colors.primary} />
        </Pressable>
      </View>

      {showFontControls && (
        <View style={styles.fontControls}>
          <Pressable
            style={styles.fontControl}
            onPress={() => setFontSize(Math.max(12, fontSize - 2))}
          >
            <Text style={styles.fontControlText}>A-</Text>
          </Pressable>
          <Text style={styles.fontSizeLabel}>{fontSize}px</Text>
          <Pressable
            style={styles.fontControl}
            onPress={() => setFontSize(Math.min(28, fontSize + 2))}
          >
            <Text style={styles.fontControlText}>A+</Text>
          </Pressable>
        </View>
      )}

      <VerseText verses={verses} fontSize={fontSize} />

      {!chapterData && (
        <View style={styles.mockNotice}>
          <Text style={styles.mockNoticeText}>
            Showing Genesis 1 (mock data). Only Genesis 1, Psalms 23, and John 3 are available.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fontButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  fontControl: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontControlText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  fontSizeLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  mockNotice: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(212, 160, 23, 0.15)',
    padding: 12,
    borderRadius: radii.sm,
  },
  mockNoticeText: {
    fontSize: 12,
    color: colors.primaryLight,
    textAlign: 'center',
  },
});
