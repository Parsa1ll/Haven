import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors, radii } from '../../constants/theme';

interface Props {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({ prompts, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {prompts.map((prompt, index) => (
        <Pressable
          key={index}
          style={styles.chip}
          onPress={() => onSelect(prompt)}
        >
          <Text style={styles.chipText}>{prompt}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.grayLight,
    backgroundColor: colors.white,
  },
  chipText: {
    fontSize: 13,
    color: colors.black,
  },
});
