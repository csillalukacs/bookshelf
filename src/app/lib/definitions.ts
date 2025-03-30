export type Author = 
{
  id: string;
  name: string;
};

export type Book = 
{
  id: string;
  title: string;
  author_id: string;
  first_pub: number;
  orig_lang_id: string;
};

export type Edition =
{
  id: string;
  book_id: string;
  ed_title: string;
  isbn: string;
  publisher_id: string;
  year_pub: number;
  lang_id: string;
  translator_id?: string;
  cover_img?: string;
  spine_img?: string;
}

export type Language =
{
  id: string;
  name: string;
}

export type Publisher =
{
  id: string;
  name: string;
}