import type { CollectionEntry } from "astro:content";

export enum PostType {
	SINGLE = "single",
    MULTI = "multi",
    PART = "part"
}

export type Frontmatter = CollectionEntry<"docs">["data"];

export interface GetSideBarEntryI {
    getSidebarEntry<T>(): T;
}

export type ByYearResult<T> = Map<number, { amt: number; entries: Array<T> }>;

export type Heading = {
    depth: number,
    slug: string,
    text: string,
}

export type SelectionMarker = {
    selected: boolean
}

export type SidebarEntry = {
    id: string,
    href: string,
    title: string,
    description: string,
}