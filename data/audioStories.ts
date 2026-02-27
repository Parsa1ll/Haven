import { ImageSourcePropType } from 'react-native';

export interface AudioStory {
  id: string;
  title: string;
  scriptureRef: string;
  duration: string;
  durationSeconds: number;
  thumbnail: ImageSourcePropType;
  topicId?: string;
}

export const bibleStories: AudioStory[] = [
  {
    id: 'story-1',
    title: "Noah's Ark",
    scriptureRef: 'Genesis 6-9',
    duration: '15 mins',
    durationSeconds: 908,
    thumbnail: require('../assets/images/Gemini_Generated_Image_atmm60atmm60atmm.png'),
  },
  {
    id: 'story-2',
    title: 'David and the Goliath',
    scriptureRef: '1 Samuel 17',
    duration: '12 mins',
    durationSeconds: 720,
    thumbnail: require('../assets/images/Gemini_Generated_Image_xyiq4wxyiq4wxyiq.png'),
  },
  {
    id: 'story-3',
    title: 'Moses and the Red Sea',
    scriptureRef: 'Exodus 14',
    duration: '10 mins',
    durationSeconds: 600,
    thumbnail: require('../assets/images/Gemini_Generated_Image_wh15pwh15pwh15pw.png'),
  },
  {
    id: 'story-4',
    title: 'Jonah and the Whale',
    scriptureRef: 'Jonah 1-4',
    duration: '8 mins',
    durationSeconds: 480,
    thumbnail: require('../assets/images/Gemini_Generated_Image_y0j5rwy0j5rwy0j5.png'),
  },
  {
    id: 'story-5',
    title: 'Daniel in the Lions Den',
    scriptureRef: 'Daniel 6',
    duration: '9 mins',
    durationSeconds: 540,
    thumbnail: require('../assets/images/Gemini_Generated_Image_os6kg2os6kg2os6k.png'),
  },
];
