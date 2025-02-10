import { Log } from "@/logs/Log";

export default function LogPage() {
  return (
    <Log page="LogPage">
      <Log logImpression section="main">
        <main>
          <div>Some div</div>
        </main>
      </Log>
    </Log>
  );
}
