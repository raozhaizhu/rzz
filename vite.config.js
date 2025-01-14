// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Prerenderer from "@prerenderer/webpack-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        {
            name: "prerenderer",
            enforce: "post",
            apply: "build",
            configResolved(config) {
                // Prerenderer 配置
                return {
                    staticDir: config.build.outDir,
                    routes: ["/", "/Quote", "/Markdown"],
                    renderer: "@prerenderer/renderer-puppeteer",
                    rendererOptions: {
                        renderAfterDocumentEvent: "render-event",
                        headless: true,
                    },
                };
            },
        },
    ],
    base: mode === "production" ? "/rzz/" : "/",
    optimizeDeps: {
        include: ["core-js/stable", "regenerator-runtime/runtime"],
    },
}));
