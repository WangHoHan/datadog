import { datadogLogs } from "@datadog/browser-logs";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        onClick={() => {
          datadogLogs.logger.info("Test", { name: "name", id: 123 });
        }}
      >
        Send log
      </button>
      <button
        onClick={() => {
          console.log("Datadog console log");
        }}
      >
        Send console.log
      </button>
      <button
        onClick={() => {
          console.error("Datadog console error");
        }}
      >
        Send console.error
      </button>
      <button
        onClick={() => {
          throw new Error("Datadog uncaught exception");
        }}
      >
        Datadog uncaught exception
      </button>
    </div>
  );
}
