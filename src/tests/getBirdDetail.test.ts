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
  expect(data.name.spanish).toBe("Pájaro");
  expect(data.size).toBe("20cm");
});
