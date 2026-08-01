import { spawn } from "node:child_process";

const forwarded = process.argv.slice(2);
const args = ["dev"];

for (let index = 0; index < forwarded.length; index += 1) {
  const value = forwarded[index];

  if (value === "--strictPort") continue;
  if (value === "--host") {
    args.push("--hostname", forwarded[index + 1]);
    index += 1;
    continue;
  }

  args.push(value);
}

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", ...args], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
