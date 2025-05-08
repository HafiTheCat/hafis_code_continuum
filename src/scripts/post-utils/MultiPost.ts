import { getEntry } from "astro:content";
import { Part } from "./Part";
import { Post } from "./Post";
import { PostInfo } from "./PostInfo";
import { PostType, type Frontmatter, type GetSideBarEntryI } from "./types";
import { PostList } from "./PostList";

export class MultiPost extends Post implements GetSideBarEntryI {
	parts: Part[] = [];

	constructor(frontmatter: Frontmatter, postInfo: PostInfo) {
		super(frontmatter, postInfo);
	}

	getSidebarEntry<MultiPostSidebarEntry>(): MultiPostSidebarEntry {
		return {
			date: new Date(this.frontmatter.date),
			title: this.frontmatter.title,
			href: this.postInfo.toSlugString(),
		} as MultiPostSidebarEntry;
	}

	static async getPartsFromMultiPost(
		current: PostInfo,
		retrieveFirstPart: boolean = false
	): Promise<PostList> {
		const parts: Part[] = [];

		let idx = retrieveFirstPart ? 0 : 1;
		let part = undefined;
		// retrieve all posts for current multi post from 1 until it hits undefined
		do {
			idx++;
			let partSegment = `${current.topic}/${current.post}/part-${idx}`;
			part = await getEntry("docs", partSegment);
			if (part !== undefined)
				parts.push(
					new Part(part.data, PostInfo.createID(current.topic, current.post, `part-${idx}`))
				);
		} while (part !== undefined);
		return new PostList(parts);
	}

	async getParts(retrieveFirstPart: boolean = false) {
		return await MultiPost.getPartsFromMultiPost(this.postInfo, retrieveFirstPart);
	}

	static retrieveFromPostInfo = async (postInfo: PostInfo): Promise<MultiPost | null> => {
		const post = await getEntry("docs", postInfo.toIDString());
		if (post === undefined) return null;
		return new MultiPost(post.data, postInfo);
	};

	static retrieveWithParts = async () => {
		return (await Post.retrieveWithMultiPostsAndParts()).filter(
			(p) => p.postInfo.postType !== PostType.MULTI
		);
	};

	/** INCLUDES MULTI POSTS ONLY */
	static retrieve = async () => {
		return (await Post.retrieveWithMultiPostsAndParts()).filter(
			(p) => p.postInfo.postType !== PostType.MULTI
		);
	};
}
