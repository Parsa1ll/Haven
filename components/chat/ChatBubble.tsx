import { View, Text, StyleSheet } from 'react-native';
import { colors, radii } from '../../constants/theme';
import { ChatMessage, VerseRef } from '../../data/chatMessages';
import VerseBadge from './VerseBadge';

interface Props {
  message: ChatMessage;
  onVersePress: (verse: VerseRef) => void;
}

export default function ChatBubble({ message, onVersePress }: Props) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      {isUser ? (
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{message.text}</Text>
        </View>
      ) : (
        <View style={styles.aiContent}>
          <Text style={styles.aiText}>
            {message.text}
            {message.verseRefs?.map((ref, i) => (
              <Text key={i}>
                {' '}
                <VerseBadge verse={ref} onPress={() => onVersePress(ref)} />
                {' they say xyz'}
              </Text>
            ))}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  userBubble: {
    backgroundColor: 'rgba(107, 58, 42, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.lg,
    maxWidth: '80%',
  },
  userText: {
    fontSize: 15,
    color: colors.black,
  },
  aiContent: {
    maxWidth: '90%',
  },
  aiText: {
    fontSize: 15,
    color: colors.black,
    lineHeight: 24,
  },
});
