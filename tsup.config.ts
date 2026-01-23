import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react-big-calendar",
    "moment",
    "date-fns",
    "clsx",
    "tailwind-merge",
    "react-hook-form",
    "@hookform/resolvers",
    "zod",
  ],
  outDir: "dist",
  tsconfig: "tsconfig.lib.json",
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  loader: {
    ".css": "copy",
  },
  // Copy CSS files to dist
  onSuccess: async () => {
    const fs = await import("fs");
    const path = await import("path");

    // Copy CSS files
    const stylesDir = path.join(process.cwd(), "lib/styles");
    const distDir = path.join(process.cwd(), "dist/styles");

    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    if (fs.existsSync(stylesDir)) {
      const files = fs.readdirSync(stylesDir);
      for (const file of files) {
        if (file.endsWith(".css")) {
          fs.copyFileSync(
            path.join(stylesDir, file),
            path.join(distDir, file)
          );
        }
      }
    }

    console.log("✅ CSS files copied to dist/styles");
  },
});
