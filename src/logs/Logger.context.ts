import { createContext, useContext } from "react";
import { Logger } from "./Logger";

const LoggerContext = createContext<Logger | null>(null);

const LoggerContextProvider = LoggerContext.Provider;

const useLoggerContext = () => {
  const context = useContext(LoggerContext);

  if (!context) {
    throw new Error(
      "useLoggerContext must be used within a LoggerContextProvider",
    );
  }

  return context;
};

export { LoggerContextProvider, useLoggerContext };
