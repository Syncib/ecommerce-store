import { useContext } from "react";
import { CollectionsContext } from "../context/CollectionsContext";
export const useCollectionContext = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw Error(
      "useCollectionContext must be used within a CollectionProvider"
    );
  }
  return context;
};
