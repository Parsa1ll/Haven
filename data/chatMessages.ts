export interface VerseRef {
  reference: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  verseRefs?: VerseRef[];
}

export const suggestedPrompts = [
  'How do I improve my relationships?',
  'What is true love?',
  'How can I find peace in hard times?',
  'What does the Bible say about forgiveness?',
];

export const mockResponses: Record<string, { text: string; verseRefs?: VerseRef[] }> = {
  default: {
    text: 'That\'s a wonderful question. The Bible offers deep wisdom on this topic. In',
    verseRefs: [
      {
        reference: 'Joshua 3:5',
        text: 'Joshua told the people, "Consecrate yourselves, for tomorrow the Lord will do amazing things among you."',
      },
    ],
  },
  relationships: {
    text: 'The Bible has much to say about relationships. One key teaching is found in',
    verseRefs: [
      {
        reference: 'Ephesians 4:2-3',
        text: 'Be completely humble and gentle; be patient, bearing with one another in love. Make every effort to keep the unity of the Spirit through the bond of peace.',
      },
    ],
  },
  love: {
    text: 'Love is one of the most central themes in Scripture. The Bible defines love beautifully in',
    verseRefs: [
      {
        reference: '1 Corinthians 13:4-7',
        text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.',
      },
    ],
  },
  peace: {
    text: 'Finding peace during difficult times is something many believers struggle with. Scripture reminds us in',
    verseRefs: [
      {
        reference: 'Philippians 4:6-7',
        text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
      },
    ],
  },
  forgiveness: {
    text: 'Forgiveness is at the very heart of the Gospel. Jesus teaches us in',
    verseRefs: [
      {
        reference: 'Matthew 6:14-15',
        text: 'For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins.',
      },
    ],
  },
};

export function getMockResponse(userMessage: string): { text: string; verseRefs?: VerseRef[] } {
  const lower = userMessage.toLowerCase();
  if (lower.includes('relationship')) return mockResponses.relationships;
  if (lower.includes('love')) return mockResponses.love;
  if (lower.includes('peace') || lower.includes('hard time')) return mockResponses.peace;
  if (lower.includes('forgiv')) return mockResponses.forgiveness;
  return mockResponses.default;
}
