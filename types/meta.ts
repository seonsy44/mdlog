export type Meta = {
  title?: string;
  date?: string;
  description?: string;
  slug?: string;
  category?: string;
  tags?: string[];
};

export type Fields =
  | "title"
  | "date"
  | "description"
  | "slug"
  | "category"
  | "tags"
  | "content";
