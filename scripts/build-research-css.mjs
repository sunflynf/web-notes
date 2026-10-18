// Precompile Tailwind CSS for each interactive page in static/research/.
// The pages used to load the Tailwind Play CDN at runtime; shipping a static
// stylesheet removes that third-party script. Re-run after editing a page:
//   yarn research:css
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const researchDir = join(import.meta.dirname, "..", "static", "research");
const tailwindBin = join(import.meta.dirname, "..", "node_modules", ".bin", "tailwindcss");
const input = join(tmpdir(), "research-tailwind-input.css");
writeFileSync(input, "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");

for (const entry of readdirSync(researchDir, { withFileTypes: true })) {
  const pageDir = join(researchDir, entry.name);
  if (!entry.isDirectory() || !existsSync(join(pageDir, "index.html"))) continue;

  execFileSync(
    tailwindBin,
    ["--input", input, "--output", join(pageDir, "tailwind.css"), "--content", `${pageDir}/*.{html,js}`, "--minify"],
    { stdio: "inherit" },
  );
}
