/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const ScannedItemsContext = createContext();

export const ScannedItemsProvider = ({ children }) => {
  const [scannedItems, setScannedItems] = useState([]);

  return (
    <ScannedItemsContext.Provider value={{ scannedItems, setScannedItems }}>
      {children}
    </ScannedItemsContext.Provider>
  );
};

export const useScannedItems = () => {
  return useContext(ScannedItemsContext);
};
