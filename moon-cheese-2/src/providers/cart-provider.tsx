import { createContext, useContext, useMemo, useReducer } from 'react';
import type { CartAction, CartLine } from '@/types/cart';
import { assertNever } from '@/types/cart';

type CartState = Record<number, CartLine>;

type CartStateContextValue = {
  lines: CartState;
  totalQuantity: number;
};

type CartActionContextValue = {
  dispatch: (action: CartAction) => void;
};

const cartStateContext = createContext<CartStateContextValue>({
  lines: {},
  totalQuantity: 0,
});

const cartActionContext = createContext<CartActionContextValue>({
  dispatch: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD': {
      const prev = state[action.productId];
      const quantity = (prev?.quantity ?? 0) + 1;

      return {
        ...state,
        [action.productId]: { productId: action.productId, quantity },
      };
    }

    case 'REMOVE': {
      const prev = state[action.productId];
      if (!prev) {
        return state;
      }

      const quantity = prev.quantity - 1;
      if (quantity <= 0) {
        const { [action.productId]: _, ...rest } = state;
        return rest;
      }

      return {
        ...state,
        [action.productId]: { ...prev, quantity },
      };
    }

    case 'SET': {
      if (action.quantity <= 0) {
        const { [action.productId]: _, ...rest } = state;
        return rest;
      }

      const prev = state[action.productId];

      return {
        ...state,
        [action.productId]: {
          ...(prev ?? { productId: action.productId }),
          quantity: action.quantity,
        },
      };
    }

    default:
      assertNever(action);
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {});

  const totalQuantity = useMemo(() => Object.values(state).reduce((sum, line) => sum + line.quantity, 0), [state]);

  const stateValue = useMemo(() => ({ lines: state, totalQuantity }), [state, totalQuantity]);

  return (
    <cartStateContext.Provider value={stateValue}>
      <cartActionContext.Provider value={{ dispatch }}>{children}</cartActionContext.Provider>
    </cartStateContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useCartDispatch = () => useContext(cartActionContext).dispatch;
