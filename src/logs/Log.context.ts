import { createContext, useContext } from "react";

const LogContext = createContext<object>({});

const LogContextProvider = LogContext.Provider;

const useLogContext = () => {
  const context = useContext(LogContext);

  return context;
};

export { LogContextProvider, useLogContext };
