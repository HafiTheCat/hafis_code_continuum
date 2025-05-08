import type { Frontmatter, GetSideBarEntryI } from "./types";
import type { PostInfo } from "./PostInfo";
import { Post } from "./Post";

export type MultiPostPartSidebarEntry = {
	date: Date;
	title: string;
	href: string;
};

export class Part extends Post implements GetSideBarEntryI {
	constructor(frontmatter: Frontmatter, postInfo: PostInfo) {
		super(frontmatter, postInfo);
	}

	getSidebarEntry<MultiPostPartSidebarEntry>(): MultiPostPartSidebarEntry {
		return {
			date: new Date(this.frontmatter.date),
			title: this.frontmatter.title,
			href: this.postInfo.toSlugString(),
		} as MultiPostPartSidebarEntry;
	}
}
