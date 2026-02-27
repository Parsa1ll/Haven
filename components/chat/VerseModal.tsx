import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { colors, fonts, radii } from '../../constants/theme';
import { VerseRef } from '../../data/chatMessages';

interface Props {
  verse: VerseRef | null;
  visible: boolean;
  onClose: () => void;
}

export default function VerseModal({ verse, visible, onClose }: Props) {
  if (!verse) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.reference}>{verse.reference}</Text>
          <Text style={styles.verseText}>{verse.text}</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: radii.xl,
    padding: 24,
    width: '100%',
  },
  reference: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 12,
  },
  verseText: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 26,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    borderRadius: radii.full,
  },
  closeText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});
