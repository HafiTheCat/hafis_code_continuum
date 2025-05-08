import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getAllPosts } from "./utils";
import type { InferEntrySchema, RenderedContent } from "astro:content";

export const onRequest = defineRouteMiddleware(async (context, next) => {
	// const allPosts = await getAllPosts();

	// context.locals.posts = getPosts(allPosts);

	return next();
});
// const url = context.url.href;
// if (url.endsWith("/")) {
// 	context.redirect(url)
// }
// // await next();
// const { entry } = context.locals.starlightRoute;
// context.locals.starlightRoute.entry.slug = `${entry.data.topic}/${entry.slug}`;
// if (entry.data.part !== undefined) {
// 	context.locals.starlightRoute.entry.slug += `/part-${entry.data.part}`;
// }
// context.locals.starlightRoute.entry.id = context.locals.starlightRoute.entry.slug;
// context.locals.starlightRoute.id = context.locals.starlightRoute.entry.slug;

// context.locals.starlightRoute.entry.data.isMultiPart = entry.data.part !== undefined;
