import { BirdDetail } from '../domain/models/BirdDetail';
import { Bird } from '../domain/models/Birds';
import { saveBirdDetailToCache, getBirdDetailFromCache } from '../utils/birdDetailStorage';

// Este modulo se encarga de centralizar la comunicacion con la api de aves
export const fetchBirds = async (): Promise<Bird[]> => {
    const response = await fetch('https://aves.ninjas.cl/api/birds');
    if (!response.ok) throw new Error('Error al obtener las aves');
    const data: Bird[] = await response.json();
    return data;
};

export const getBirdDetail = async (url: string, uid: string): Promise<BirdDetail> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error de red');
    const data: BirdDetail = await response.json();
    await saveBirdDetailToCache(uid, data);
    return data;
  } catch (e) {
    console.warn('Fallo fetch, usando cache');
    const cached = await getBirdDetailFromCache(uid);
    if (cached) return cached;
    throw new Error('No se pudo obtener el detalle del ave ni desde red ni desde cache');
  }
};
