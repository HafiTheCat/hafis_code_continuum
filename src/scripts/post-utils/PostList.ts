import { getAllPosts, post_filter } from "../utils";
import type { ByYearResult, SelectionMarker, SidebarEntry } from "./types";
import { Post } from "./Post";
import type { PostInfo } from "./PostInfo";
import { PostsPerYear } from "./PostsPerYear";

export class PostList {
	posts: Post[] = [];

	constructor(posts: Post[]) {
		this.posts = posts;
	}

	static retrieve = async () => {
		return (await getAllPosts()).map((p) => new Post(p.data));
	};

	getLatestPosts(amt: number): PostList {
		return new PostList(post_filter(this.posts, "latest", amt));
	}

	getRandomPosts(amt: number): PostList {
		return new PostList(post_filter(this.posts, "random", amt));
	}

	get isEmpty(): boolean {
		return this.posts.length === 0;
	}
	get hasPosts(): boolean {
		return !this.isEmpty;
	}

	get firstPost(): Post | undefined {
		return this.posts[0];
	}

	get headers() {
		return this.posts.map((p) => p.heading);
	}

	get amount(): number {
		return this.posts.length;
	}
	get sidebarEntriesBasic(): SidebarEntry[] {
		return this.posts.map((p) => ({
			id: p.postInfo.toIDString(),
			href: p.postInfo.toSlugString(),
			title: p.frontmatter.title,
			description: p.frontmatter.description!,
		}));
	}
	sidebarEntries(current: PostInfo): (SidebarEntry & SelectionMarker)[] {
		return this.posts.map((p) => ({
			id: p.postInfo.toIDString(),
			href: p.postInfo.toSlugString(),
			title: p.frontmatter.title,
			description: p.frontmatter.description!,
			selected: current.toIDString() === p.postInfo.toIDString(),
		}));
	}
}
