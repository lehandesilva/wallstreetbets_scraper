import playwright from "playwright";

type PostData = {
  id: string;
  title: string;
  url: string;
  author: string;
  time: string;
};

async function getPostsInPage(page: playwright.Page) {
  console.log("getting links of posts from page");
  // Find all posts inside "search-result" divs
  const posts = page.locator(".search-result");

  // Extract data for each post
  const postData: PostData[] = await posts.evaluateAll((elements) =>
    elements.map((element) => {
      const titleElement = element.querySelector(".search-title");
      const timeElement = element.querySelector(".search-time time");
      const authorElement = element.querySelector(".search-author a.author");

      return {
        id: element.getAttribute("data-fullname") || "",
        title: titleElement?.textContent || "",
        url: titleElement?.getAttribute("href") || "",
        author: authorElement?.textContent || "",
        time: timeElement?.getAttribute("datetime") || "",
      };
    })
  );

  return postData; // Return the array of post data
}

// async function getDataForPosts(posts: string[]) {
//   let data = [];
//   for (const post of posts) {
//     let postData = await getPostData(post);
//     data.push(postData);
//   }
// }

// async function getPostData(post) {
//   let postData = {};

//   return postData;
// }

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

  let pagePosts = await getPostsInPage(page);

  console.log(pagePosts);

  await browser.close();

  console.log("closed browser");
}
if (require.main === module) {
  main();
}

// Scraper Logic
// go to r/wallstreetbets
// get links to the posts from 24 hours ago
// go to each post
// get the text from the post
// get the comments from the post
