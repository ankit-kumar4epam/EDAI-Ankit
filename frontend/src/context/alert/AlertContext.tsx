import React, { createContext, ReactNode, useState } from "react";
import { AlertContextType, AlertCustom, Type } from "./type";

const AlertContext = createContext<AlertContextType | undefined>(undefined);
const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertCustom | null>(null);
  const collapse = () => {};
  const showAlert = (type: Type, heading: string, message: string) => {
    setAlert({ type, heading, message });
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert, collapse }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
