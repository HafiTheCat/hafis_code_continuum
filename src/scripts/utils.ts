import { getCollection, type CollectionEntry } from "astro:content";
import type { GetStaticPaths } from "astro";
import {
	doubleTags,
	DOCS_COLLECTION_NAME,
	singleTags,
	tagCategories,
	type TagType,
	DESCRIPTIONS,
} from "@/consts";
import { Post } from "./post-utils/Post";
import { MultiPost } from "./post-utils/MultiPost";

export function groupTagsByPrimary(tags: TagType[]): Record<string, string[]> {
	return tags.reduce(
		(acc, tag) => {
			const isPrimaryTag = tag.includes("/");
			if (!isPrimaryTag) {
				acc["tags that belong to no group"].push(tag);
				return acc;
			}
			const primaryTag = tag.split("/")[0];
			if (!acc[primaryTag]) {
				acc[primaryTag] = [];
			}
			acc[primaryTag].push(tag);
			return acc;
		},
		{ "tags that belong to no group": [] } as Record<string, string[]>
	);
}

export const post_filter = <T extends Post>(
	posts: T[],
	filter: "random" | "latest",
	amount: number
) => {
	let out_posts: T[] = [];
	if (filter === "latest") {
		out_posts = [...posts].sort(
			(a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
		);
	}
	if (filter === "random") {
		out_posts = [...posts].sort(() => Math.random() - 0.5);
	}
	if (amount !== undefined) {
		out_posts = out_posts.slice(0, amount);
	}
	return out_posts;
};

export const getDoubleTagPaths = async () => {
	return doubleTags
		.map((tag) => tag.split("/"))
		.map(([category, tag]) => ({
			params: { category, tag },
		}));
};

export const getSingleTagsPaths = async () => {
	return singleTags.map((tag) => ({
		params: { tag: tag + "/" },
	}));
};

export const getCategoryPaths = async () => {
	return [...tagCategories, "uncategorized"].map((category) => ({
		params: { category: category + "/" },
	}));
};

export const getTagPaths = (async () => {
	console.debug("getTagPaths");
	const posts = await getAllPosts();
	const allTags = Array.from(new Set(posts.flatMap((p) => p.data.tags ?? [])));
	return allTags.map((tag) => ({
		params: { tag },
	}));
}) satisfies GetStaticPaths;

export const getAllPosts = async (custom_filter?: (e: CollectionEntry<"docs">) => boolean) => {
	return await getCollection(DOCS_COLLECTION_NAME, (e) => {
		return e.data.draft !== true && e.data.topic === "posts" && (custom_filter ? custom_filter(e) : true);
	});
};

export function getContentNotice(tags: Array<string>): string | null {
	if (tags.includes("state/abandoned")) {
		return DESCRIPTIONS.abandoned;
	}

	if (tags.includes("state/paused")) {
		return DESCRIPTIONS.paused;
	}
	return null;
}

export function fromCollectionEntry(entry: CollectionEntry<"docs">): Post {
		if (entry.data.slug === undefined) {
			throw new Error("Slug is not defined");
		}

		const postInfo = Post.getPostInfo(entry.data.slug);

		return postInfo.isSinglePost
			? new Post(entry.data, postInfo)
			: new MultiPost(entry.data, postInfo);
	}

