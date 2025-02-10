import { useEffect, useMemo } from "react";
import { LogContextProvider, useLogContext } from "./Log.context";
import { useLoggerContext } from "./Logger.context";

export const Log = ({
  children,
  logImpression,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const consumedProps = useLogContext();
  const logger = useLoggerContext();

  const combinedProps = useMemo(
    // Object structure, for now simple spread
    () => ({ ...consumedProps, ...props }),
    [consumedProps, props],
  );

  useEffect(() => {
    // We can add intersection observer to check if it is in view
    if (logImpression) {
      console.log("logImpression", combinedProps);
      logger.sendLog("Impression", combinedProps);
    }
  }, [combinedProps, logImpression, logger]);

  return (
    <LogContextProvider value={combinedProps}>{children}</LogContextProvider>
  );
};
