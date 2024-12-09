import { createContext, useReducer } from "react";

export const CollectionsContext = createContext();

export const collectionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLLECTIONS":
      return { ...state, collections: action.payload };
    case "CREATE_COLLECTIONS":
      return { ...state, collections: [action.payload, ...state.collections] };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.itemid !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const CollectionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionsReducer, {
    collections: null, // Collection of items fetched from the API
    cart: [], // Initial cart state
  });

  return (
    <CollectionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollectionsContext.Provider>
  );
};
