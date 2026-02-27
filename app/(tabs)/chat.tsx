import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../constants/theme';
import { ChatMessage, VerseRef, suggestedPrompts, getMockResponse } from '../../data/chatMessages';
import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import SuggestedPrompts from '../../components/chat/SuggestedPrompts';
import VerseModal from '../../components/chat/VerseModal';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<VerseRef | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getMockResponse(text);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: response.text,
        verseRefs: response.verseRefs,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Haven</Text>
        <Pressable style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={22} color={colors.primary} />
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListHeaderComponent={
          messages.length === 0 ? (
            <Text style={styles.emptyText}>What's on your mind?</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            onVersePress={(verse) => setSelectedVerse(verse)}
          />
        )}
        ListFooterComponent={
          isTyping ? (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>...</Text>
            </View>
          ) : null
        }
      />

      {/* Suggested prompts */}
      {messages.length < 3 && (
        <SuggestedPrompts prompts={suggestedPrompts} onSelect={sendMessage} />
      )}

      {/* Input */}
      <View style={{ paddingBottom: insets.bottom }}>
        <ChatInput onSend={sendMessage} />
      </View>

      {/* Verse Modal */}
      <VerseModal
        verse={selectedVerse}
        visible={!!selectedVerse}
        onClose={() => setSelectedVerse(null)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.primary,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageList: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 24,
    color: colors.gray,
    letterSpacing: 4,
  },
});
