export type productType = {
  id: number;
  name: string;
  price: number;
  stock: number;
}[];

export const mainProducts = [
  { id: 0, name: 'Falaka', price: 10, stock: 100 },
  { id: 1, name: 'Arabam', price: 15, stock: 50 },
  { id: 2, name: 'Körlük', price: 5, stock: 25 },
  { id: 3, name: 'Simyacı', price: 3, stock: 30 },
];
