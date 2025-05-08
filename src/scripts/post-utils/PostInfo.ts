import { PostType } from "./types";

export class PostInfo {
	private _postType: PostType;
	private constructor(
		public topic: string,
		public post: string,
		public part: string | undefined,
		private type: "id" | "slug"
	) {
		const isPart = part !== undefined && part !== "part-1";
		if (isPart) {
			this._postType = PostType.PART;
		} else {
			this._postType = part === undefined ? PostType.SINGLE : PostType.MULTI;
		}
	}

	static parse(pathString: string): PostInfo | null {
		const idMatch = pathString.match(/^([^/]+)\/([^/]+)(?:\/([^/]+))?$/);
		if (idMatch) {
			return new PostInfo(idMatch[1], idMatch[2], idMatch[3], "id");
		}

		const strictSlugMatch = pathString.match(/^\/([^/]+)\/([^/]+)(?:\/([^/]+))?\/?$/);
		if (strictSlugMatch) {
			return new PostInfo(strictSlugMatch[1], strictSlugMatch[2], strictSlugMatch[3], "slug");
		}

		if (pathString.includes("/")) {
			const cleanedPath = pathString.replace(/^\/|\/$/g, "");
			const parts = cleanedPath.split("/");

			if (parts.length >= 2) {
				const topic = parts[0];
				const post = parts[1];
				const part = parts.length > 2 ? parts.slice(2).join("/") : undefined;

				if (pathString.startsWith("/")) {
					return new PostInfo(topic, post, part, "slug");
				}
			}
		}

		return null;
	}

	static createID(topic: string, post: string, part?: string): PostInfo {
		return new PostInfo(topic, post, part, "id");
	}

	static createSlug(topic: string, post: string, part?: string): PostInfo {
		return new PostInfo(topic, post, part, "slug");
	}

	getType(): "id" | "slug" {
		return this.type;
	}

	toString(): string {
		if (this.type === "id") {
			return `${this.topic}/${this.post}${this.part ? `/${this.part}` : ""}`;
		} else {
			return `/${this.topic}/${this.post}${this.part ? `/${this.part}` : ""}/`;
		}
	}

	toIDString(): string {
		return `${this.topic}/${this.post}${this.part ? `/${this.part}` : ""}`;
	}

	toSlugString(): string {
		return `/${this.topic}/${this.post}${this.part ? `/${this.part}` : ""}/`;
	}

	convertToOtherType(): PostInfo {
		if (this.type === "id") {
			return new PostInfo(this.topic, this.post, this.part, "slug");
		} else {
			return new PostInfo(this.topic, this.post, this.part, "id");
		}
	}

	get postType(): PostType {
		return this._postType;
	}

	get isSinglePost(): boolean {
		return this._postType === PostType.SINGLE;
	}
	get isMultiPost(): boolean {
		return this._postType === PostType.MULTI;
	}
	get isPart(): boolean {
		return this._postType === PostType.PART;
	}
}
