import { createContext, useReducer } from "react";

export const CollectionsContext = createContext();

export const collectionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLLECTIONS":
      return { ...state, collections: action.payload };
    case "CREATE_COLLECTIONS":
      return { ...state, collections: [action.payload, ...state.collections] };
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.itemid === action.payload.itemid
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.itemid === action.payload.itemid
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.itemid !== action.payload),
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.itemid === action.payload.itemId
            ? {
                ...item,
                quantity: (item.quantity || 1) + action.payload.change,
              }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const CollectionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionsReducer, {
    collections: null, 
    cart: [], 
  });

  return (
    <CollectionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollectionsContext.Provider>
  );
};
