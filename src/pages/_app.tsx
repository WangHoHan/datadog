import "@/styles/globals.css";
import type { AppProps } from "next/app";
// Note: it is recommended to use a matching version with RUM SDK if used.
import { datadogLogs } from "@datadog/browser-logs";

datadogLogs.init({
  clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
  site: "datadoghq.eu",
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
  forwardConsoleLogs: "all",
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
