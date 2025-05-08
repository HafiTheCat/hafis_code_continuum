import { PostType, type Frontmatter, type GetSideBarEntryI, type Heading } from "./types";
import { getCollection } from "astro:content";
import { PostInfo } from "./PostInfo";
import { PostList } from "./PostList";
import { fromCollectionEntry, getAllPosts } from "../utils";

export type PostSidebarEntry = {
	date: Date;
	title: string;
	href: string;
};

export class Post implements GetSideBarEntryI {
	frontmatter: Frontmatter;
	postInfo: PostInfo;

	constructor(frontmatter: Frontmatter, postInfo?: PostInfo) {
		this.frontmatter = frontmatter;
		if (!this.frontmatter.slug) {
			throw new Error("Invalid Slug");
		}
		this.postInfo = postInfo ?? Post.getPostInfo(this.frontmatter.slug);
	}

	getSidebarEntry<PostSidebarEntry>(): PostSidebarEntry {
		return {
			date: new Date(this.frontmatter.date),
			title: this.frontmatter.title,
			href: this.postInfo.toSlugString(),
		} as PostSidebarEntry;
	}

	isSelected(activeURi: string): boolean {
		return this.frontmatter.slug === activeURi;
	}

	static getPostInfo = (path: string): PostInfo => {
		const postInfo = PostInfo.parse(path);
		if (postInfo === null) {
			throw new Error(`Invalid ${path} passed to PostInfo`);
		}
		return postInfo;
	};

	/** INCLUDES ONLY SINGLE POSTS */
	static retrieve = async () => {
		return (await Post.retrieveWithMultiPostsAndParts()).filter(
			(p) => p.postInfo.postType === PostType.SINGLE
		);
	};

	/** INCLUDES SINGLE AND MULTI POSTS */
	static retrieveWithMultiPosts = async () => {
		return new PostList(
			(await Post.retrieveWithMultiPostsAndParts()).filter(
				(p) => p.postInfo.postType !== PostType.PART
			)
		);
	};

	/** INCLUDES SINGLE, MULTI AND PARTS */
	static retrieveWithMultiPostsAndParts = async () => {
		return (await getAllPosts()).map(fromCollectionEntry);
	};

	static retrieveBasedOnTag = async (tag: string) => {
		return new PostList(
			(await getCollection("docs", (p) => p.data.draft !== true && p.data.tags.includes(tag))).map(
				fromCollectionEntry
			)
		);
	};

	get _frontmatter(): Frontmatter {
		return this.frontmatter;
	}

	get heading(): Heading {
		return {
			depth: 3,
			slug: `/${this.frontmatter.slug!}/`,
			text: this.frontmatter.title,
		};
	}
}
