// src/context/FilterContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface Filters {
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpDate: string;
  dropOffDate: string;
  category: string;
  gearbox: string;
  engine: string;
  priceMin: number;
  priceMax: number;
}

const FilterContext = createContext<{
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}>({
  filters: {
    pickUpLoc: "Choose location",
    dropOffLoc: "Choose location",
    pickUpDate: "",
    dropOffDate: "",
    category: "",
    gearbox: "",
    engine: "",
    priceMin: 0,
    priceMax: 5000,
  },
  setFilters: () => {},
});

// Custom hook to use the FilterContext
export const useFilter = () => useContext(FilterContext);

// Define the type for children prop
interface FilterProviderProps {
  children: ReactNode;
}

// FilterProvider component
export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    pickUpLoc: "Choose location",
    dropOffLoc: "Choose location",
    pickUpDate: "",
    dropOffDate: "",
    category: "",
    gearbox: "",
    engine: "",
    priceMin: 0,
    priceMax: 5000,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
