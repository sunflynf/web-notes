// Verifies every entry in redirects.ts against the built site (run after `yarn build`).
// A redirect passes only when the from-page is a real redirect stub whose meta refresh URL
// equals the expected target, the target page exists and is not itself a redirect, and no
// entry points at another entry's source (no chains).
import { existsSync, readFileSync } from "node:fs";
import { redirects } from "../../redirects.ts";

const BASE_URL = "/web-notes";
const REFRESH = /<meta\s+http-equiv="refresh"\s+content="([^"]*)"/i;
const failures = [];

const sources = new Set(redirects.map((r) => r.from + "/"));

for (const { from, to } of redirects) {
  const fromFile = `build${from}/index.html`;
  const toFile = `build${to}index.html`;

  if (!existsSync(fromFile)) {
    failures.push(`${from}: missing ${fromFile}`);
  } else {
    const match = readFileSync(fromFile, "utf8").match(REFRESH);
    if (!match) {
      failures.push(`${from}: ${fromFile} has no meta refresh (it is a real page, not a redirect)`);
    } else {
      const url = match[1].match(/url=(.+)$/i)?.[1].trim();
      if (url !== `${BASE_URL}${to}`) {
        failures.push(`${from}: meta refresh goes to ${url}, expected ${BASE_URL}${to}`);
      }
    }
  }

  if (!existsSync(toFile)) {
    failures.push(`${from}: target page missing ${toFile}`);
  } else if (REFRESH.test(readFileSync(toFile, "utf8"))) {
    failures.push(`${from}: target ${toFile} is itself a redirect (chain)`);
  }

  if (sources.has(to)) {
    failures.push(`${from}: target ${to} is another entry's source (chain)`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`${failures.length} redirect check failure(s)`);
  process.exitCode = 1;
} else {
  console.log(`${redirects.length} redirects OK`);
}
