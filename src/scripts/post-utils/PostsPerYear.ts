import { PostList } from "./PostList";
import type { Heading } from "./types";

export type PostsCategorizedPerYear = Map<number, PostList>;

export class PostsPerYear {
	posts: PostsCategorizedPerYear = new Map<number, PostList>();
	constructor(posts: PostsCategorizedPerYear) {
		this.posts = posts;
	}

	get headers(): Heading[] {
		return Array.from(this.posts.entries())
			.map(([year, entries]) => {
				return [
					{
						depth: 2,
						slug: year.toString(),
						text: year.toString(),
					},
					...entries.headers,
				];
			})
			.flat();
	}

	static fromPostList(
		postList: PostList,
		getDate: (item: Post) => Date | number,
		sortFn?: (a: Post, b: Post) => number
	): PostsPerYear {
		const result: PostsCategorizedPerYear = new Map<number, PostList>();

		// Group items
		for (const item of postList.posts) {
			const dateOrTs = getDate(item);
			const date = dateOrTs instanceof Date ? dateOrTs : new Date(dateOrTs);
			const year = date.getFullYear();

			if (!result.has(year)) {
				result.set(year, new PostList([]));
			}

			const group = result.get(year)!;
			group.posts.push(item);
		}

		// Optionally sort each year’s entries
		if (sortFn) {
			for (const [, entries] of result) {
				entries.posts.sort(sortFn);
			}
		}

		return new PostsPerYear(result);
	}
}
