// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        {
            name: "html-transform",
            enforce: "post",
            generateBundle(_, bundle) {
                const htmlFile = bundle["index.html"];
                if (htmlFile) {
                    let html = htmlFile.source;
                    // 添加基础 meta 标签
                    html = html.replace(
                        "</head>",
                        `    <!-- Twitter Card Meta Tags -->
                            <meta property="og:url" content="https://raozhaizhu.github.io/rzz/Quote" />
                            <meta property="og:type" content="website" />
                            <meta property="og:title" content="Random Quote Generator" />
                            <meta property="og:description" content="Get your daily inspiration with random quotes" />
                            <meta property="og:image" content="https://raozhaizhu.github.io/rzz/x-cover.jpg" />
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:domain" content="raozhaizhu.github.io" />
                            <meta name="twitter:url" content="https://raozhaizhu.github.io/rzz/Quote" />
                            <meta name="twitter:title" content="Random Quote Generator" />
                            <meta name="twitter:description" content="Get your daily inspiration with random quotes" />
                            <meta name="twitter:image" content="https://raozhaizhu.github.io/rzz/x-cover.jpg" />
                        </head>`
                    );
                    htmlFile.source = html;
                }
            },
        },
    ],
    base: mode === "production" ? "/rzz/" : "/",
}));
