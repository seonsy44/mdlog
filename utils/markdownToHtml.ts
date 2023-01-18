import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";

const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);
  return result.value;
};

export default markdownToHtml;
