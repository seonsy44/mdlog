import fs from "fs";
import path from "path";

import { POST_DIR_NAME } from "../utils/consts";
import frontMatter from "../utils/frontMatter";
import type { Fields, Meta } from "../types/meta";

const postsDirectory = path.join(process.cwd(), POST_DIR_NAME);

export function getPostFilenames() {
  return fs.readdirSync(postsDirectory);
}

export function getPostByFilename(filename: string, fields: Fields[]) {
  const realFilename = filename.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realFilename}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = frontMatter(fileContents);

  const items: { [key: string]: any } = {};

  fields.forEach((field) => {
    if (field === "content") items[field] = content;
    else if (field === "slug") items["slug"] = realFilename;
    else if (data[field] !== undefined) items[field] = data[field];
  });

  return items;
}

export function getAllPost(fields: Fields[]) {
  const filenames = getPostFilenames();

  if (!fields.some((field) => field === "date")) fields.push("date");

  const posts = filenames
    .map((filename) => getPostByFilename(filename, fields))
    .sort((post1, post2) => Date.parse(post1.date) - Date.parse(post2.date));

  return posts;
}
