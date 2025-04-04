export interface Bird {
    uid: string;
    name: {
      spanish: string;
      english: string;
      latin: string;
    };
    images: {
      main: string;
      thumb: string;
    };
    map: {
      image: string;
      description: string;
    };
    iucn: {
      title: string;
      description: string;
    };
    species: string;
    habitat: string;
    did_you_know: string;
    measurements: string;
  }