import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page on this site is pre-rendered at build time, so no cache bindings are needed.
export default defineCloudflareConfig();
