export type CartLine = {
  productId: number;
  quantity: number;
};

export type CartAction =
  | { type: 'ADD'; productId: number }
  | { type: 'REMOVE'; productId: number }
  | { type: 'SET'; productId: number; quantity: number };

export function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(x)}`);
}
