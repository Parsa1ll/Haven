import { AudioStory } from './audioStories';

export interface AudioTopic {
  id: string;
  title: string;
  thumbnail: any;
  episodes: AudioStory[];
}

export const audioTopics: AudioTopic[] = [
  {
    id: 'faith',
    title: 'Faith & Beliefs',
    thumbnail: require('../assets/images/Gemini_Generated_Image_2n1jbf2n1jbf2n1j.png'),
    episodes: [
      {
        id: 'faith-1',
        title: 'Faith Defined',
        scriptureRef: 'Epistle to the Hebrews 1-11',
        duration: '12 mins',
        durationSeconds: 720,
        thumbnail: require('../assets/images/Gemini_Generated_Image_2n1jbf2n1jbf2n1j.png'),
        topicId: 'faith',
      },
      {
        id: 'faith-2',
        title: 'Faith in Action',
        scriptureRef: 'Epistle of James 2-17',
        duration: '5 mins',
        durationSeconds: 300,
        thumbnail: require('../assets/images/Gemini_Generated_Image_3ewsjx3ewsjx3ews.png'),
        topicId: 'faith',
      },
      {
        id: 'faith-3',
        title: 'Faith Moves Mountains',
        scriptureRef: 'Gospel of Matthew 17-20',
        duration: '3 mins',
        durationSeconds: 180,
        thumbnail: require('../assets/images/Gemini_Generated_Image_ukuq2wukuq2wukuq.png'),
        topicId: 'faith',
      },
      {
        id: 'faith-4',
        title: 'The Righteous Shall Live',
        scriptureRef: 'Epistle to the Romans 1-17',
        duration: '17 mins',
        durationSeconds: 1020,
        thumbnail: require('../assets/images/Gemini_Generated_Image_rpnhhrpnhhrpnhhr.png'),
        topicId: 'faith',
      },
      {
        id: 'faith-5',
        title: 'Trust in the Lord',
        scriptureRef: 'Book of Proverbs 3-6',
        duration: '4 mins',
        durationSeconds: 240,
        thumbnail: require('../assets/images/Gemini_Generated_Image_v7p0kmv7p0kmv7p0.png'),
        topicId: 'faith',
      },
    ],
  },
  {
    id: 'love',
    title: 'Love',
    thumbnail: require('../assets/images/Gemini_Generated_Image_p0thn5p0thn5p0th.png'),
    episodes: [
      {
        id: 'love-1',
        title: 'God Is Love',
        scriptureRef: '1 John 4:8',
        duration: '8 mins',
        durationSeconds: 480,
        thumbnail: require('../assets/images/Gemini_Generated_Image_p0thn5p0thn5p0th.png'),
        topicId: 'love',
      },
      {
        id: 'love-2',
        title: 'Love Your Neighbor',
        scriptureRef: 'Mark 12:31',
        duration: '6 mins',
        durationSeconds: 360,
        thumbnail: require('../assets/images/Gemini_Generated_Image_k84y3qk84y3qk84y.png'),
        topicId: 'love',
      },
    ],
  },
  {
    id: 'salvation',
    title: 'Salvation',
    thumbnail: require('../assets/images/Gemini_Generated_Image_rpnhhrpnhhrpnhhr.png'),
    episodes: [
      {
        id: 'salvation-1',
        title: 'The Way of Salvation',
        scriptureRef: 'Romans 10:9-10',
        duration: '10 mins',
        durationSeconds: 600,
        thumbnail: require('../assets/images/Gemini_Generated_Image_rpnhhrpnhhrpnhhr.png'),
        topicId: 'salvation',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community',
    thumbnail: require('../assets/images/Gemini_Generated_Image_k84y3qk84y3qk84y.png'),
    episodes: [
      {
        id: 'community-1',
        title: 'The Body of Christ',
        scriptureRef: '1 Corinthians 12:12-27',
        duration: '11 mins',
        durationSeconds: 660,
        thumbnail: require('../assets/images/Gemini_Generated_Image_k84y3qk84y3qk84y.png'),
        topicId: 'community',
      },
    ],
  },
];
