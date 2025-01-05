"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = __importDefault(require("playwright"));
function getPostsInPage(page) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getting links of posts from page");
        // Find all posts inside "search-result" divs
        const posts = page.locator(".search-result");
        // Extract data for each post
        const postData = yield posts.evaluateAll((elements) => elements.map((element) => {
            const titleElement = element.querySelector(".search-title");
            const timeElement = element.querySelector(".search-time time");
            const authorElement = element.querySelector(".search-author a.author");
            return {
                id: element.getAttribute("data-fullname") || "",
                title: (titleElement === null || titleElement === void 0 ? void 0 : titleElement.textContent) || "",
                url: (titleElement === null || titleElement === void 0 ? void 0 : titleElement.getAttribute("href")) || "",
                author: (authorElement === null || authorElement === void 0 ? void 0 : authorElement.textContent) || "",
                time: (timeElement === null || timeElement === void 0 ? void 0 : timeElement.getAttribute("datetime")) || "",
            };
        }));
        return postData; // Return the array of post data
    });
}
function getDataFromPosts(page, posts) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getting data from posts");
        let postsData = [];
        for (let post of posts) {
            console.log(`getting data from post ${post.id}: ${post.title}`);
            yield page.goto(post.url);
            // Get post text and upvotes
            const mainPost = page.locator("div#siteTable >> div.thing");
            const upvotes = yield mainPost.getAttribute("data-score");
            const no_of_comments = yield mainPost.getAttribute("data-comments-count");
            const text = yield mainPost.evaluate((element) => {
                const textElement = element.querySelector("div.usertext-body");
                return (textElement === null || textElement === void 0 ? void 0 : textElement.textContent) || "";
            });
            const id = yield mainPost.getAttribute("id");
            const comments = yield getCommentsFromPost(page);
            postsData.push({
                id: id || `thing_${post.id}`,
                postId: post.id,
                post_text: text || "",
                comments: comments,
                number_of_comments: parseInt(no_of_comments || "0"),
                number_of_upvotes: parseInt(upvotes || "0"),
            });
        }
        return postsData;
    });
}
function getCommentsFromPost(page) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get comments
        const comments = page.locator("div.commentarea >> div.thing");
        const commentsData = yield comments.evaluateAll((elements) => {
            return elements.map((element) => {
                const textElement = element.querySelector("div.usertext-body");
                return (textElement === null || textElement === void 0 ? void 0 : textElement.textContent) || "";
            });
        });
        console.log(commentsData);
        return commentsData;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("launching browser");
        const browser = yield playwright_1.default.chromium.launch({
            headless: false,
        });
        const context = yield browser.newContext();
        const page = yield context.newPage();
        yield page.goto("https://ns.reddit.com/r/wallstreetbets/search?sort=new&restrict_sr=on&q=flair%3ADD");
        // get links to the posts from 24 hours ago
        let pagePosts = yield getPostsInPage(page);
        // go to each post and get the text and comments
        let postsData = yield getDataFromPosts(page, pagePosts);
        yield browser.close();
        console.log("closed browser");
    });
}
if (require.main === module) {
    main();
}
// Scraper Logic
// get the text from the post
// get the comments from the post
