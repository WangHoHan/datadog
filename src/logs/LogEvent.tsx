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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEventHandlers(
  child: ReactElement,
  consumedProps: object,
  actionProps: any,
  logger: Logger,
) {
  const eventHandlers = {};

  Object.entries(actionProps).forEach(([eventHandlerName, handlerProps]) => {
    eventHandlers[eventHandlerName] = (...args) => {
      // Call the original event handler if it exists
      if (child.props[eventHandlerName]) {
        child.props[eventHandlerName](...args);
      }

      // Log the event with merged properties
      console.log({ ...consumedProps, ...handlerProps });
      logger.sendLog({ ...consumedProps, ...handlerProps });
    };
  });

  return eventHandlers;
}

interface LogEventChildrenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionProps: any;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionProps: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elementType: any;
  logEventProps: object;
}

export const LogEvent = ({
  children,
  actionProps,
  elementType,
  logEventProps,
}: PropsWithChildren<LogEventProps>) => {
  if (!logEventProps || !actionProps) {
    return children;
  }

  return (
    <Log elementType={elementType} {...logEventProps}>
      <LogEventChildren actionProps={actionProps}>{children}</LogEventChildren>
    </Log>
  );
};
