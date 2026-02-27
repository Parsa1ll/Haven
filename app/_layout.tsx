import { Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppProvider } from '../context/AppContext';
import { PlayerProvider } from '../context/PlayerContext';
import MiniPlayer from '../components/player/MiniPlayer';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // Always call hooks at the top level
  const segments = useSegments();
  const [fontsLoaded] = useFonts({
    'NewYorkSmall-Regular': require('../assets/fonts/NewYorkSmall-Regular.otf'),
    'NewYorkSmall-Bold': require('../assets/fonts/NewYorkSmall-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }

  // Hide MiniPlayer on chat tab
  const isChatTab = segments.includes('chat');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <PlayerProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="daily-verse" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          {!isChatTab && <MiniPlayer />}
          <StatusBar style="dark" />
        </PlayerProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
