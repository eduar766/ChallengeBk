import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bird } from '../domain/models/Birds';

const STORAGE_KEY = 'cached_birds';

export const saveBirdsToCache = async (birds: Bird[]) => {
  try {
    const json = JSON.stringify(birds);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (e) {
    console.error('Error al guardar aves en cache', e);
  }
};

export const getCachedBirds = async (): Promise<Bird[] | null> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Error al obtener aves desde cache', e);
    return null;
  }
};
