import { datadogLogs } from "@datadog/browser-logs";

export default function Home() {
  return (
    <button
      onClick={() => datadogLogs.logger.info("Test", { name: "name", id: 123 })}
    >
      Send log
    </button>
  );
}
