export interface Verse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  verseEnd?: number;
  text: string;
  reference: string;
}

export const dailyVerses: Verse[] = [
  {
    id: 'daily-1',
    book: 'Psalm',
    chapter: 56,
    verse: 3,
    text: 'When I am afraid, I put my trust in you',
    reference: 'Psalm 56:3',
  },
  {
    id: 'daily-2',
    book: '1 Peter',
    chapter: 5,
    verse: 7,
    text: 'Cast all your anxiety on him because he cares for you.',
    reference: '1 Peter 5:7',
  },
  {
    id: 'daily-3',
    book: 'Philippians',
    chapter: 4,
    verse: 13,
    text: 'I can do all things through Christ who strengthens me.',
    reference: 'Philippians 4:13',
  },
  {
    id: 'daily-4',
    book: 'Proverbs',
    chapter: 3,
    verse: 5,
    verseEnd: 6,
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    reference: 'Proverbs 3:5-6',
  },
  {
    id: 'daily-5',
    book: 'Isaiah',
    chapter: 41,
    verse: 10,
    text: 'So do not fear, for I am with you; do not be dismayed, for I am your God.',
    reference: 'Isaiah 41:10',
  },
  {
    id: 'daily-6',
    book: 'Romans',
    chapter: 8,
    verse: 28,
    text: 'And we know that in all things God works for the good of those who love him.',
    reference: 'Romans 8:28',
  },
  {
    id: 'daily-7',
    book: 'Jeremiah',
    chapter: 29,
    verse: 11,
    text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
    reference: 'Jeremiah 29:11',
  },
];

export function getDailyVerse(): Verse {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dailyVerses[dayOfYear % dailyVerses.length];
}
