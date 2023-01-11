import yaml from "js-yaml";
import type { Meta } from "../types/meta";

const frontMatter = (contents: string) => {
  const [, meta, content] = contents.split("---");
  const metaData = yaml.load(meta) as Meta;

  return { data: metaData, content };
};

export default frontMatter;
