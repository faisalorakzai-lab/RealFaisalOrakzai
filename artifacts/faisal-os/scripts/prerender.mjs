#!/usr/bin/env node
  /**
   * Post-build pre-render: visits every route with headless Chrome,
   * captures fully-rendered HTML, saves it so ALL bots read real content.
   */
  import puppeteer from "puppeteer";
  import { createServer } from "http";
  import { readFile, writeFile, mkdir } from "fs/promises";
  import { existsSync } from "fs";
  import path from "path";
  import { fileURLToPath } from "url";

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DIST = path.resolve(__dirname, "..", "dist/public");
  const PORT = 9173;

  const ROUTES = [
    "/",
    "/founder",
    "/ecosystem",
    "/benchmarks",
    "/research",
    "/press",
    "/learning",
    "/media",
    "/investment",
    "/contact",
  ];

  const MIME = {
    ".html": "text/html", ".js": "application/javascript",
    ".mjs": "application/javascript", ".css": "text/css",
    ".json": "application/json", ".png": "image/png",
    ".jpg": "image/jpeg", ".svg": "image/svg+xml",
    ".ico": "image/x-icon", ".woff2": "font/woff2",
    ".woff": "font/woff", ".ttf": "font/ttf",
    ".mp4": "video/mp4", ".webp": "image/webp",
    ".webm": "video/webm",
  };

  function startServer() {
    return new Promise((resolve) => {
      const server = createServer(async (req, res) => {
        let url = req.url.split("?")[0];
        if (url === "/") url = "/index.html";
        let filePath = path.join(DIST, url);
        if (!existsSync(filePath)) filePath = path.join(DIST, "index.html");
        try {
          const ext = path.extname(filePath);
          const content = await readFile(filePath);
          res.writeHead(200, { "Content-Type": MIME[ext] || "text/plain" });
          res.end(content);
        } catch {
          res.writeHead(404); res.end("Not found");
        }
      });
      server.listen(PORT, () => {
        console.log("  Server: http://localhost:" + PORT);
        resolve(server);
      });
    });
  }

  async function prerender() {
    console.log("\n=== PRE-RENDER START ===");
    const server = await startServer();

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox", "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", "--disable-gpu",
        "--disable-accelerated-2d-canvas",
      ],
    });

    for (const route of ROUTES) {
      console.log("  Rendering: " + route);
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });

      await page.goto("http://localhost:" + PORT + route, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait for React content (SplashScreen skips via navigator.webdriver)
      await new Promise((r) => setTimeout(r, 1500));

      // Remove Replit-specific banners/overlays before saving
      await page.evaluate(() => {
        ["#runtime-error-modal", "[data-replit-banner]", ".replit-banner"]
          .forEach((sel) => document.querySelector(sel)?.remove());
      });

      const html = await page.content();
      await page.close();

      if (route === "/") {
        await writeFile(path.join(DIST, "index.html"), html, "utf-8");
      } else {
        const dir = path.join(DIST, route.slice(1));
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, "index.html"), html, "utf-8");
      }
      console.log("  ✓ saved: " + route);
    }

    await browser.close();
    server.close();
    console.log("=== PRE-RENDER DONE ===\n");
  }

  prerender().catch((e) => { console.error("Pre-render failed:", e); process.exit(1); });
  