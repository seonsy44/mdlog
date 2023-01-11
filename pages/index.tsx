import type { GetStaticProps } from "next";

import { getAllPost } from "../services/posts";

type Props = {
  posts: {
    [key: string]: any;
  }[];
};

export default function Home({ posts }: Props) {
  console.log(posts);
  return <>hello</>;
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPost([
    "title",
    "date",
    "category",
    "description",
    "slug",
    "tags",
  ]);

  return {
    props: { posts },
  };
};
