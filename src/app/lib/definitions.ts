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

export type Language =
{
  id: string;
  name: string;
}