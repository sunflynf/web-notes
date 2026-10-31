// Verifies every entry in redirects.ts against the built site (run after `yarn build`).
import { existsSync, readFileSync } from "node:fs";
import { redirects } from "../../redirects.ts";

const BASE_URL = "/web-notes";
const failures = [];

for (const { from, to } of redirects) {
  const fromFile = `build${from}/index.html`;
  const toFile = `build${to}index.html`;

  if (!existsSync(fromFile)) {
    failures.push(`${from}: missing ${fromFile}`);
  } else if (!readFileSync(fromFile, "utf8").includes(`${BASE_URL}${to}`)) {
    failures.push(`${from}: ${fromFile} does not refresh to ${BASE_URL}${to}`);
  }

  if (!existsSync(toFile)) {
    failures.push(`${from}: target page missing ${toFile}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`${failures.length} redirect check failure(s)`);
} else {
  console.log(`${redirects.length} redirects OK`);
}
process.exit(failures.length ? 1 : 0);
