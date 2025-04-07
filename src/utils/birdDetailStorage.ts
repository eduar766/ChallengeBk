import AsyncStorage from '@react-native-async-storage/async-storage';
import { BirdDetail } from '../domain/models/BirdDetail';

export const saveBirdDetailToCache = async (uid: string, data: BirdDetail) => {
  try {
    await AsyncStorage.setItem(`bird_detail_${uid}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error guardando el detalle del ave ${uid}:`, e);
  }
};

export const getBirdDetailFromCache = async (uid: string): Promise<BirdDetail | null> => {
  try {
    const json = await AsyncStorage.getItem(`bird_detail_${uid}`);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error(`Error cargando el detalle del ave ${uid}:`, e);
    return null;
  }
};
