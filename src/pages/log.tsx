import { Log } from "@/logs/Log";
import { LogEvent } from "@/logs/LogEvent";
import { PropsWithChildren } from "react";

interface ButtonProps {
  logEventProps: object;
  onClick: () => void;
}

const Button = ({
  children,
  logEventProps,
  onClick,
}: PropsWithChildren<ButtonProps>) => (
  <LogEvent
    actionProps={{ onClick: { action: "click" } }}
    elementType="button"
    logEventProps={logEventProps}
  >
    <button onClick={onClick}>{children}</button>
  </LogEvent>
);

export default function LogPage() {
  return (
    <Log page="home">
      <Log logImpression section="hero">
        <Log component="hero">
          <div>Hero</div>
          <Button
            logEventProps={{
              elementName: "call-to-action-button",
            }}
            onClick={() => {}}
          >
            Call to action
          </Button>
        </Log>
      </Log>
    </Log>
  );
}
