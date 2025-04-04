import { Bird } from '../domain/models/Birds';

export const fetchBirds = async (): Promise<Bird[]> => {
    const response = await fetch('https://aves.ninjas.cl/api/birds');
    if (!response.ok) throw new Error('Error al obtener las aves');
    const data: Bird[] = await response.json();
    return data;
};
