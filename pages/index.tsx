import Link from "next/link";
import type { GetStaticProps } from "next";

import { getAllPost } from "../services/posts";

type Props = {
  posts: {
    [key: string]: any;
  }[];
};

export default function Home({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`posts/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
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
