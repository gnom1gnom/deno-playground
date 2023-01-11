
import type { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run --allow-net server.ts",
      desc: "Start server",
    },
    wsclient: {
      cmd: "deno run --allow-net ws_client.ts ",
      desc: "Web socket client",
    },
  },

};

export default config;