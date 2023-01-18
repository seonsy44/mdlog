import { getPostByFilename, getPostFilenames } from "../../services/posts";
import type { GetStaticPropsContext } from "next";
import markdownToHtml from "../../utils/markdownToHtml";
import { Meta } from "../../types/meta";

type Props = {
  post: Meta & { content: string };
};

export default function Post({ post }: Props) {
  return (
    <>
      <h1>title: {post.title}</h1>
      <time>{post.date}</time>
      <div>category: {post.category}</div>
      <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
    </>
  );
}

export function getStaticPaths() {
  const realFilenames = getPostFilenames().map((filename) =>
    filename.replace(/\.md$/, "")
  );

  const slugs = realFilenames.map((filename) => ({
    params: { slug: filename },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { params } = ctx;
  const filename = params?.slug + ".md";

  const post = getPostByFilename(filename, [
    "title",
    "date",
    "description",
    "category",
    "tags",
    "content",
  ]);

  const htmlContent = await markdownToHtml(post.content);

  return {
    props: {
      post: { ...post, content: htmlContent },
    },
  };
}
