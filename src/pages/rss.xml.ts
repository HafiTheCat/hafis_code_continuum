import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/consts";
import { getAllPosts } from "@/scripts/utils";

export async function GET(context: any) {
	const posts = await getAllPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.id}`,
		})),
	});
}
