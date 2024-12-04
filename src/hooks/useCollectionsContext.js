import { useContext } from "react";
import { CollectionContext } from "../context/CollectionsContexts";
export const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw Error(
      "useCollectionContext must be used within a CollectionProvider"
    );
  }
  return context;
};
