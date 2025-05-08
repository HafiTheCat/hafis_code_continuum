export const BASE_URL = import.meta.env.SITE;
export const SITE_TITLE = "Hafi's Code Continuum";
export const SITE_DESCRIPTION =
	"Welcome to my personal blog where share anything that I find particularly interesting.";

export const DOCS_COLLECTION_NAME = "docs";

export const MAGIC_NUMBERS = {
	// after this many tags, the details will be closed by default
	open_tag_details_threshold: 20,
} as const;

export const DESCRIPTIONS = {
	post_index: "All posts sorted by year",
	part_index: "All parts sorted by year",
	tag_index: "All tags sorted by category",
	abandoned: "This content has been abandonded or was preceded by a newer version.",
	paused: "This content is currently paused, due to my focus being on other topics.",
} as const;

export const TOPICS = {
	posts: "posts",
	tags: "tags",
	about: "about",
	privacy: "privacy",
} as const;

export const SLUGS = {
	privacy: "/privacy/",
	about: "/about/",
	posts: "/posts/",
	tags: "/tags/",
	parts: "/parts/",
} as const;

export const TITLES = {
	privacy: "Privacy Policy 🔒",
	latest_posts: "Latest Posts 📮",
	all_posts: "All Posts 📁",
	tags: "Tags 🏷️",
	random_posts: "Random Posts 🎲",
	last_edits: "Latest Edits 📝",
	post_index: "Post Index 🗂",
	part_index: "Part Index 📚",
	tag_index: "Tag Index 🏷️",
	available_tags: "Available Tags 🏷️",
	browse: "Take a peek at the indexes 📚",
	category: "Category: ${category}",
	no_posts: "No posts found 😔",
	no_tags: "No tags found 😔",
	post_with_tag: "Posts with ${tag}",
	category_with_tag: "Posts with ${category}/${tag}",
} as const;

export const LABELS = {
	privacy: "Privacy",
	about: "About",
	posts: "Posts",
	tags: "Tags",
	series_index: "Series Index",
	series: "Series",
	click_me: "Click Me",
	looking_for_post_index: "Looking for the post index?",
	looking_for_part_index: "Looking for the part index?",
	// series: "Series",
} as const;

export const HERO = {
	title: "Yello 🔭",
	tagline: "You have found my Blog <i>(v2)</i> ✨<br>It contains all sorts of content from ideas, to projects, to things i find interesting, mostly coding related though. It is still currently work in progress but eventually it will get there.",
	page_title: "Welcome to my blog 📔",
	call_to_action_label: "Take a peek",
	call_to_action_github_label: "View on Github",
	// latest_post.props.data.title
	banner_content: `Check out my latest post about <i class="font-semibold">\${title}</i> > <a href="\${id}/" class="underline underline-offset-2 font-bold">Check it out</a>`,
} as const;

export const tagColorMap: Record<string, string> = {
	"content/*": "!bg-[hsl(230,39%,22%)] !text-[hsl(230,82%,87%)] !border-[hsl(230,82%,63%)]",
	"lang/*": "!bg-[hsl(110,39%,22%)] !text-[hsl(110,82%,87%)] !border-[hsl(110,82%,63%)]",
	"tool/*": "!bg-[hsl(200,39%,22%)] !text-[hsl(200,82%,87%)] !border-[hsl(200,82%,63%)]",
	"state/*": "!bg-[hsl(0,39%,22%)] !text-[hsl(0,82%,87%)] !border-[hsl(0,82%,63%)]",
};
export function getTagClasses(tag: string): string {
	if (tagColorMap[tag]) {
		return tagColorMap[tag];
	}
	for (const key of Object.keys(tagColorMap)) {
		if (key.endsWith("/*")) {
			const prefix = key.slice(0, -2);
			if (tag.startsWith(prefix + "/")) {
				return tagColorMap[key];
			}
		}
	}
	//!bg-gray-200 !text-gray-800
	return "!bg-[hsl(0,0%,22%)] !text-[hsl(0,0%,87%)] !border-[hsl(0,0%,63%)]";
}

export type TagDef = { label: string; description: string };

export const tag_definition = {
	content: [
		{ label: "about", description: "Describes content related to about" },
		{ label: "guides", description: "Describes content related to guides" },
		{ label: "lorem", description: "Describes content related to lorem" },
	],
	lang: [
		{ label: "markdown", description: "Describes content related to markdown" },
		{ label: "mdx", description: "Describes content related to mdx" },
	],
	state: [
		{ label: "draft", description: "Describes content related to draft" },
		{ label: "completed", description: "Describes content related to published" },
		{ label: "paused", description: "Describes content related to paused" },
		{ label: "abandoned", description: "Describes content related to abandoned" },
	],
	uncategorized: [
		{ label: "other_tag", description: "Describes content related to other_tag" },
		{ label: "super_good_tag", description: "Describes content related to super_good_tag" },
	],
} as const;

type SingleTag = (typeof tag_definition.uncategorized)[number]["label"];

type DoubleTag = {
	[K in Exclude<keyof typeof tag_definition, "uncategorized">]: `${K &
		string}/${(typeof tag_definition)[K][number]["label"]}`;
}[Exclude<keyof typeof tag_definition, "uncategorized">];

export type TagType = SingleTag | DoubleTag;

export function getTagDescription(tag: TagType): string | undefined {
	if (tag.includes("/")) {
		// double tag: "category/label"
		const [category, label] = tag.split("/") as [keyof typeof tag_definition, string];
		const entry = tag_definition[category]?.find((t) => t.label === label);
		return entry?.description;
	} else {
		// single tag: just lookup under "_"
		const entry = tag_definition.uncategorized.find((t) => t.label === tag);
		return entry?.description;
	}
}

export const singleTags = tag_definition.uncategorized.map((t) => t.label);
export const doubleTags = Object.entries(tag_definition)
	.filter(([k]) => k !== "uncategorized")
	.flatMap(([k, defs]) => defs.map((t) => `${k}/${t.label}`));
export const allTags = [...singleTags, ...doubleTags];

export const tagCategories = (
	Object.keys(tag_definition) as (keyof typeof tag_definition)[]
).filter((key) => key !== "uncategorized");

export const tagCategoriesWithUncategorized = (
	Object.keys(tag_definition) as (keyof typeof tag_definition)[]
);

import { z } from "zod";
export const tagsEnum = z.enum(allTags as [string, ...string[]]);

export const tagsByCategory = Object.fromEntries(
	Object.entries(tag_definition).map(([cat, tags]) => [
		cat,
		tags.map((tag_def: TagDef) =>
			cat === "uncategorized" ? `${tag_def.label}` : `${cat}/${tag_def.label}`
		),
	])
) as { [K in keyof typeof tag_definition]: string[] };

export const getTagsFromCategory = (category: keyof typeof tag_definition) => {
	return tagsByCategory[category];
};
// hsl(var(--sl - hue - red), 39 %, 22 %) // bg
// hsl(var(--sl-hue-red), 82%, 87%); //text
