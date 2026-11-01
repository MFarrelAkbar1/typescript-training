import { fileURLToPath } from "node:url";
import type { ViteUserConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

/**
 * Semua test meng-import lewat alias:
 *   @ex/dayN/<file>  -> soal hari N
 *   @app/<path>      -> mini project
 * Mode "exercises" mengarah ke days/ dan project/, mode "solutions" mengarah ke solutions/.
 */
export function makeConfig(mode: "exercises" | "solutions"): ViteUserConfig {
  const isSolution = mode === "solutions";
  return {
    resolve: {
      alias: [
        {
          find: /^@ex\/(day\d)\/(.*)$/,
          replacement: isSolution ? `${root}solutions/$1/$2` : `${root}days/$1/exercises/$2`,
        },
        {
          find: /^@app\/(.*)$/,
          replacement: isSolution ? `${root}solutions/project/$1` : `${root}project/$1`,
        },
      ],
    },
    test: {
      include: ["days/**/*.test.{ts,tsx}", "project/test/**/*.test.{ts,tsx}"],
      testTimeout: 20_000,
      hookTimeout: 30_000,
      fileParallelism: false,
      typecheck: {
        include: ["days/**/*.test.{ts,tsx}", "project/test/**/*.test.{ts,tsx}"],
        tsconfig: isSolution ? "./tsconfig.solutions.json" : "./tsconfig.json",
      },
    },
  };
}
