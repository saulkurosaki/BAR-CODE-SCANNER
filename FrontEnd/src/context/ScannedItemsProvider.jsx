/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const ScannedItemsContext = createContext();

export const useScannedItems = () => {
  return useContext(ScannedItemsContext);
};

export const ScannedItemsProvider = ({ children }) => {
  const [scannedItems, setScannedItems] = useState([]);

  const addItem = (item) => {
    setScannedItems((prevItems) => [...prevItems, item]);
  };

  return (
    <ScannedItemsContext.Provider value={{ scannedItems, addItem }}>
      {children}
    </ScannedItemsContext.Provider>
  );
};
