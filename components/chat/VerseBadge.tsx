import { Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../constants/theme';
import { VerseRef } from '../../data/chatMessages';

interface Props {
  verse: VerseRef;
  onPress: () => void;
}

export default function VerseBadge({ verse, onPress }: Props) {
  return (
    <Pressable style={styles.badge} onPress={onPress}>
      <Text style={styles.text}>{verse.reference} </Text>
      <Ionicons name="arrow-forward" size={10} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
    gap: 2,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
});
