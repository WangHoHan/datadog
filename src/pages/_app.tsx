import "@/styles/globals.css";
import type { AppProps } from "next/app";
// Note: it is recommended to use a matching version with RUM SDK if used.
import { datadogLogs } from "@datadog/browser-logs";
import { LoggerContextProvider } from "@/logs/Logger.context";
import { Logger } from "@/logs/Logger";
import { Log } from "@/logs/Log";

datadogLogs.init({
  clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
  site: "datadoghq.eu",
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
  forwardConsoleLogs: "all",
});

const logger = new Logger();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoggerContextProvider value={logger}>
      <Log
        user={{
          id: "123",
          name: "Test user",
        }}
      >
        <Component {...pageProps} />
      </Log>
    </LoggerContextProvider>
  );
}
