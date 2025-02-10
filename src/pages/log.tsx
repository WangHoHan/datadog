import { Log } from "@/logs/Log";
import { LogEvent } from "@/logs/LogEvent";
import { HTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps {
  logEventProps: object;
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
}

// We can create HOF withLogEvent
const Button = ({
  children,
  logEventProps,
  onClick,
}: PropsWithChildren<ButtonProps>) => (
  <LogEvent
    actionProps={{ onClick: { action: "click" } }}
    logEventProps={{ elementType: "button", ...logEventProps }}
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
            onClick={(e) => {
              console.log(e);
            }}
          >
            Call to action
          </Button>
        </Log>
      </Log>
    </Log>
  );
}
