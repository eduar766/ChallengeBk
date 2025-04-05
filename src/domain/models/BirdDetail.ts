export interface BirdDetail {
    uid: string;
    name: {
      spanish: string;
      english: string;
      latin: string;
    };
    map: {
      image: string;
      title: string;
    };
    iucn: {
      title: string;
      description: string;
    };
    habitat: string;
    didyouknow: string;
    migration: boolean;
    dimorphism: boolean;
    size: string;
    order: string;
    species: string;
    images: {
      main: string;
      gallery: { url: string }[];
    };
  }
  