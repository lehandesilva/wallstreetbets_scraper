export type PostData = {
  id: string;
  title: string;
  url: string;
  author: string;
  time: string;
};

export type PagePosts = PostData[];

export type postData = {
  id: string;
  postId: string;
  post_text: string;
  comments: string[] | null;
  number_of_comments: number;
  number_of_upvotes: number;
};
