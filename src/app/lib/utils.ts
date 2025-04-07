import { Edition } from "./definitions";

export function getCoverUrl(edition: Edition): string
{
  if (edition.cover_img) return process.env.NEXT_PUBLIC_CLOUDFRONT_URL + edition.cover_img;
  else return `https://covers.openlibrary.org/b/isbn/${edition.isbn}-M.jpg`;
}

export function getSpineUrl(edition: Edition): string
{
  if (edition.spine_img) return process.env.NEXT_PUBLIC_CLOUDFRONT_URL + edition.spine_img;
  else return '';
}