import { getBirdDetail } from '../api/birdsApi';
import { BirdDetail } from '../domain/models/BirdDetail';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

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

const server = setupServer(
  rest.get('https://fakeapi.com/bird', (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches bird detail successfully', async () => {
  const data = await getBirdDetail('https://fakeapi.com/bird');
  expect(data.name.spanish).toBe("Pájaro");
  expect(data.size).toBe("20cm");
});
