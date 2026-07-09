import type { CollectionEntry } from 'astro:content';

export const PAGE_SIZE = 9;

export function sortPosts(posts: CollectionEntry<'blog'>[]) {
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
