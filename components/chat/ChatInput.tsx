import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../constants/theme';

interface Props {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        placeholderTextColor={colors.gray}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <Pressable
        style={[styles.sendButton, text.trim() ? styles.sendActive : null]}
        onPress={handleSend}
        disabled={!text.trim()}
      >
        <Ionicons
          name="send"
          size={18}
          color={text.trim() ? colors.primary : colors.gray}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: radii.full,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendActive: {
    backgroundColor: 'rgba(107, 58, 42, 0.08)',
  },
});
