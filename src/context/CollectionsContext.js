import { createContext, useReducer } from "react";

export const CollectionsContext = createContext();

export const collectionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLLECTIONS":
      return { ...state, collections: action.payload };
    case "CREATE_COLLECTIONS":
      return { ...state, collections: [action.payload, ...state.collections] };
    default:
      return state;
  }
};

export const CollectionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionsReducer, {
    collections: null,
  });
  return (
    <CollectionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollectionsContext.Provider>
  );
};
