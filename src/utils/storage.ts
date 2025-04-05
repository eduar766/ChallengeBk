import AsyncStorage from '@react-native-async-storage/async-storage';

const REMOVED_BIRDS_KEY = 'removed_birds';

export const getRemovedBirds = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(REMOVED_BIRDS_KEY);
  return json ? JSON.parse(json) : [];
};

export const addRemovedBird = async (uid: string) => {
  const removed = await getRemovedBirds();
  const updated = Array.from(new Set([...removed, uid]));
  await AsyncStorage.setItem(REMOVED_BIRDS_KEY, JSON.stringify(updated));
};
