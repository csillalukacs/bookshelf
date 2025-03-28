export type Author = 
{
  id: string;
  name: string;
};

export type Book = 
{
  id: string;
  title: string;
  authorId: string;
  firstPub: number;
  origLangId: string;
};

export type Language =
{
  id: string;
  name: string;
}