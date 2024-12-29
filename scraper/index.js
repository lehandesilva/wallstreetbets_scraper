const playwright = require("playwright");

const connectionUrl = process.env.CONNECTION_URL;

let allPosts = {};

async function main() {
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://old.reddit.com/r/wallstreetbets/search?sort=top&q=flair%3ADD&restrict_sr=on&t=day"
  );

  await browser.close();

  if (require.main === module) {
    main();
  }
}
