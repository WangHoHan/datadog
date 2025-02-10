import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from "react";
import { useLogContext } from "./Log.context";
import { Log } from "./Log";
import { useLoggerContext } from "./Logger.context";
import { Logger } from "./Logger";

function getEventHandlers(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  child: ReactElement<any>,
  consumedProps: object,
  actionProps: Record<string, object>,
  logger: Logger,
) {
  const eventHandlers: Record<string, object> = {};

  Object.entries(actionProps).forEach(([eventHandlerName, handlerProps]) => {
    eventHandlers[eventHandlerName] = (...args: unknown[]) => {
      if (child.props[eventHandlerName]) {
        child.props[eventHandlerName](...args);
      }

      // Log the event with merged properties
      console.log({ ...consumedProps, ...handlerProps });
      logger.sendLog("", { ...consumedProps, ...handlerProps });
    };
  });

  return eventHandlers;
}

interface LogEventChildrenProps {
  actionProps: Record<string, object>;
}

const LogEventChildren = ({
  actionProps,
  children,
}: PropsWithChildren<LogEventChildrenProps>) => {
  const combinedProps = useLogContext();
  const logger = useLoggerContext();

  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(
        child,
        getEventHandlers(child, combinedProps, actionProps, logger),
      );
    }

    return child;
  });
};

interface LogEventProps {
  actionProps: Record<string, object>;
  logEventProps: object;
}

export const LogEvent = ({
  children,
  actionProps,
  logEventProps,
}: PropsWithChildren<LogEventProps>) => {
  if (!logEventProps || !actionProps) {
    return children;
  }

  return (
    <Log {...logEventProps}>
      <LogEventChildren actionProps={actionProps}>{children}</LogEventChildren>
    </Log>
  );
};
