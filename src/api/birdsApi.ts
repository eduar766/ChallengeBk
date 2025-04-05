import { BirdDetail } from '../domain/models/BirdDetail';
import { Bird } from '../domain/models/Birds';

export const fetchBirds = async (): Promise<Bird[]> => {
    const response = await fetch('https://aves.ninjas.cl/api/birds');
    if (!response.ok) throw new Error('Error al obtener las aves');
    const data: Bird[] = await response.json();
    return data;
};

export const getBirdDetail = async (url: string): Promise<BirdDetail> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('No se pudo obtener el detalle del ave');
    }
    const data: BirdDetail = await response.json();
    return data;
};