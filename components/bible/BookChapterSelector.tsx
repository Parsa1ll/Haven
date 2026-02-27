import { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, Modal, ScrollView, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '../../constants/theme';
import { bibleBooks } from '../../data/bible';

interface Props {
  book: string;
  chapter: number;
  onSelect: (book: string, chapter: number) => void;
}

export default function BookChapterSelector({ book, chapter, onSelect }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
  };

  const handleChapterSelect = (chapterNum: number) => {
    if (selectedBook) {
      onSelect(selectedBook, chapterNum);
      setSelectedBook(null);
      setShowModal(false);
    }
  };

  const bookData = selectedBook
    ? bibleBooks.find(b => b.name === selectedBook)
    : null;

  return (
    <>
      <Pressable style={styles.pill} onPress={() => setShowModal(true)}>
        <Ionicons name="book-outline" size={16} color={colors.primary} />
        <Text style={styles.pillText}>{book}</Text>
        <View style={styles.chapterBadge}>
          <Text style={styles.chapterText}>{chapter}</Text>
        </View>
      </Pressable>

      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedBook ? `${selectedBook} - Chapter` : 'Select Book'}
            </Text>
            <Pressable
              onPress={() => {
                if (selectedBook) {
                  setSelectedBook(null);
                } else {
                  setShowModal(false);
                }
              }}
            >
              <Text style={styles.closeText}>
                {selectedBook ? 'Back' : 'Close'}
              </Text>
            </Pressable>
          </View>

          {selectedBook && bookData ? (
            <FlatList
              data={Array.from({ length: bookData.chapters }, (_, i) => i + 1)}
              numColumns={5}
              keyExtractor={item => item.toString()}
              contentContainerStyle={styles.chapterGrid}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.chapterCell,
                    item === chapter && book === selectedBook && styles.chapterCellActive,
                  ]}
                  onPress={() => handleChapterSelect(item)}
                >
                  <Text
                    style={[
                      styles.chapterCellText,
                      item === chapter && book === selectedBook && styles.chapterCellTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          ) : (
            <ScrollView contentContainerStyle={styles.bookList}>
              {bibleBooks.map(b => (
                <Pressable
                  key={b.name}
                  style={[styles.bookRow, b.name === book && styles.bookRowActive]}
                  onPress={() => handleBookSelect(b.name)}
                >
                  <Text
                    style={[
                      styles.bookName,
                      b.name === book && styles.bookNameActive,
                    ]}
                  >
                    {b.name}
                  </Text>
                  <Text style={styles.bookChapters}>{b.chapters} chapters</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.full,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
  },
  chapterBadge: {
    backgroundColor: colors.grayLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  chapterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  modal: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  modalTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.primary,
  },
  closeText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  bookList: {
    padding: 16,
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radii.md,
  },
  bookRowActive: {
    backgroundColor: 'rgba(107, 58, 42, 0.08)',
  },
  bookName: {
    fontSize: 16,
    color: colors.black,
  },
  bookNameActive: {
    fontWeight: '700',
    color: colors.primary,
  },
  bookChapters: {
    fontSize: 13,
    color: colors.gray,
  },
  chapterGrid: {
    padding: 16,
  },
  chapterCell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  chapterCellActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chapterCellText: {
    fontSize: 16,
    color: colors.black,
  },
  chapterCellTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
});
