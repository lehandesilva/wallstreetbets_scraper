const playwright = require("playwright");

const connectionUrl = process.env.CONNECTION_URL;

let allPosts = {};

async function getPostsInPage(page) {
  console.log("getting posts in page");
  let posts = [];

  const postElements = await page.locator(
    " search-result search-result-link has-thumbnail has-linkflair linkflair-dd "
  );

  return postElements;
}

async function main() {
  console.log("launching browser");
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://ns.reddit.com/r/wallstreetbets/search?sort=new&restrict_sr=on&q=flair%3ADD"
  );

  let hour = 1000 * 60 * 60;

  let now = Date.now();
  let cutoff = Date.now() - 24 * hour;
  let earliest = new Date();

  let posts = [];
  while (cutoff < earliest) {
    let pagePosts = await getPostsInPage(page);

    console.log(`found ${pagePosts.length} posts`);
  }

  await browser.close();

  console.log("closed browser");
}
if (require.main === module) {
  main();
}

// Scraper Logic
// go to r/wallstreetbets
// get posts from the page (doubt there'll be a next page)
// go to each post, get post data and the comments
