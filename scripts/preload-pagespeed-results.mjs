#!/usr/bin/env node
// =====================================================================
// Cron entrypoint for the "Preload Pagespeed Results" Dokploy schedule.
//
// Dokploy runs this with `docker exec` inside the already-running app
// container, so it talks to the server over loopback rather than going back
// out through Cloudflare and Traefik to reach the same process.
//
// This used to be a bare `curl https://pagespeed.bootpack.dev/...`. That
// worked while Dokploy built the image with nixpacks, whose image happened to
// carry curl. The image is now built from node:22-slim (see Dockerfile), which
// ships neither curl nor wget, so every run failed with
// `curl: command not found`. Node is the one interpreter the runtime image is
// guaranteed to have, so the job is a Node script.
//
// Node builtins only: the runtime stage ships `output: "standalone"`, which is
// just the dependencies Next traced as reachable from the server. There is no
// node_modules tree here to import from.
// =====================================================================

// The server binds PORT (Dockerfile defaults it to 3000). Loopback, not the
// public host: no DNS, no TLS, no edge in the path, and the job cannot fail
// because of something happening in front of the container.
const PORT = process.env.PORT ?? "3000";
const ENDPOINT = `http://127.0.0.1:${PORT}/api/preload-pagespeed-results`;

// The route fans out to the PageSpeed Insights API for up to 20 pages, each
// staggered 500ms apart, and waits for all of them. Minutes is normal; the
// timeout is only here so a wedged run cannot sit forever against a schedule
// that fires every 30 minutes.
const TIMEOUT_MS = Number(process.env.PRELOAD_TIMEOUT_MS ?? 10 * 60 * 1000);

const log = (message) => console.log(`[preload-pagespeed-results] ${message}`);

log(`GET ${ENDPOINT} (timeout ${TIMEOUT_MS}ms)`);

let response;
try {
  response = await fetch(ENDPOINT, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
} catch (error) {
  // A timeout arrives as TimeoutError, a refused connection as a TypeError
  // wrapping the cause. Either way the run did not happen.
  log(`request failed: ${error instanceof Error ? error.message : error}`);
  if (error?.cause) log(`cause: ${error.cause}`);
  process.exit(1);
}

const body = await response.text();

if (!response.ok) {
  // Exit non-zero so Dokploy records the run as failed instead of silently
  // logging a 500 and reporting success.
  log(`HTTP ${response.status} ${response.statusText}: ${body}`);
  process.exit(1);
}

log(`HTTP ${response.status}: ${body}`);
