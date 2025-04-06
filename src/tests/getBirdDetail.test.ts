import { getBirdDetail } from '../api/birdsApi';

const mockResponse = {
  uid: "test-bird",
  name: { spanish: "Pájaro", english: "Bird", latin: "Aves" },
  map: { image: "http://fake.com/map.svg", title: "En el sur" },
  iucn: { title: "LC", description: "Menor riesgo" },
  habitat: "Bosques",
  didyouknow: "Es migratorio",
  migration: true,
  dimorphism: false,
  size: "20cm",
  order: "Passeriformes",
  species: "Nativa",
  images: {
    main: "http://fake.com/image.jpg",
    gallery: [{ url: "http://fake.com/gallery.jpg" }]
  }
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })
  ) as jest.Mock;
});

test('fetches bird detail successfully', async () => {
  const data = await getBirdDetail('https://fakeapi.com/bird', 'test-bird');
  
  // Validar campos principales
  expect(data.uid).toBe("test-bird");
  expect(data.name.spanish).toBe("Pájaro");
  expect(data.name.english).toBe("Bird");
  expect(data.name.latin).toBe("Aves");

  // Validar mapa
  expect(data.map.image).toBe("http://fake.com/map.svg");
  expect(data.map.title).toBe("En el sur");

  // Validar estado de conservación
  expect(data.iucn.title).toBe("LC");
  expect(data.iucn.description).toBe("Menor riesgo");

  // Validar información adicional
  expect(data.habitat).toBe("Bosques");
  expect(data.didyouknow).toBe("Es migratorio");
  expect(data.migration).toBe(true);
  expect(data.dimorphism).toBe(false);

  // Validar tamaño, orden y especie
  expect(data.size).toBe("20cm");
  expect(data.order).toBe("Passeriformes");
  expect(data.species).toBe("Nativa");

  // Validar imágenes
  expect(data.images.main).toBe("http://fake.com/image.jpg");
  expect(data.images.gallery).toHaveLength(1);
  expect(data.images.gallery[0].url).toBe("http://fake.com/gallery.jpg");
});
