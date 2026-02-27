import { Stack } from 'expo-router';

export default function AudioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[topicId]" />
    </Stack>
  );
}
