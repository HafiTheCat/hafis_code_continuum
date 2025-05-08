/// <reference types="astro/client" />

interface Post {
    frontmatter: Frontmatter;
    postInfo: PostInfo;
}

interface MultiPost {
    frontmatter: Frontmatter;
    postInfo: PostInfo;
    parts: Post[];
}

declare namespace App {
	interface Locals extends App.StarlightLocals {
		posts: Map<string, Post | MultiPost>;
	}
}
