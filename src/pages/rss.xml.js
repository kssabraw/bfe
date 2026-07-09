import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortPosts } from '../lib/blog';

export async function GET(context) {
  const posts = sortPosts(await getCollection('blog'));
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: 'Be Found Everywhere – Blog',
    description:
      'AEO and SEO tips to help your business get found in search engines and AI assistants.',
    site: new URL(base || '/', context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${base}/blog/${post.id}/`,
    })),
  });
}
