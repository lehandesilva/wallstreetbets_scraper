import playwright from "playwright";
import { postData, PostData } from "./types";
import { PagePosts } from "./types";

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

async function getDataFromPosts(page: playwright.Page, posts: PostData[]) {
  console.log("getting data from posts");
  let postsData: postData[] = [];
  for (let post of posts) {
    console.log(`getting data from post ${post.id}: ${post.title}`);
    await page.goto(post.url);

    // Get post text and upvotes
    const sitetable = await page.$("div.sitetable");
    if (sitetable != null) {
      const thing = await sitetable.$(".thing");
      const upvotes = await thing?.getAttribute("data-score");
      const no_of_comments = await thing?.getAttribute("data-comments-count");
      let text = await sitetable
        .$("div.usertext-body")
        .then(async (element) => await element?.textContent())
        .catch((e) => {
          console.log(e);
          return "";
        });

      postsData.push({
        id: post.id,
        postId: post.id,
        post_text: text || "",
        comments: null,
        number_of_comments: parseInt(no_of_comments || "0"),
        number_of_upvotes: parseInt(upvotes || "0"),
      });
    }
  }
  return postsData;
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

  // get links to the posts from 24 hours ago
  let pagePosts: PagePosts = await getPostsInPage(page);

  // go to each post and get the text and comments
  let postsData = await getDataFromPosts(page, pagePosts);

  console.log(postsData);

  await browser.close();

  console.log("closed browser");
}
if (require.main === module) {
  main();
}

// Scraper Logic
// get the text from the post
// get the comments from the post
