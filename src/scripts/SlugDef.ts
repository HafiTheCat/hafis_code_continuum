import { getAllPosts } from "./utils";

//TODO REFACTOR
// export const getSinglePostPaths = (async () => {
//     const posts = await getAllPosts();
//     return posts
//         .filter((p) => !p.id.includes("/part-"))
//         .map((p) => ({
//             params: { post: p.id.split("/")[1] },
//             props: p,
//         }));
// }) satisfies GetStaticPaths;

// export const getMultiPostPaths: GetStaticPaths = (async () => {
//     const posts = await getAllPosts();
//     return posts
//         .filter((p) => p.id.includes("/part-"))
//         .map((p) => {
//             const [, , post, part] = p.id.split("/");
//             return {
//                 params: { post, part },
//                 props: p,
//             };
//         });
// }) satisfies GetStaticPaths;

function splitId(id: string) {
	const parts = id.split("/").filter(Boolean);
	return parts;
}

export const getPathsForSinglePostsAndMultiPostPartOnes = async () => {
	const all = await getAllPosts();

	const _all = all
		.map((e) => {
			const [, post,] = splitId(e.id);
			// if (part) return null;
			return {
				params: { post },
				props: e,
			};
		})
		.filter(Boolean);

	return _all;
};

export const getPathsForMultiPostsAndParts = async () => {
	const all = await getAllPosts();

	return all
		.map((e) => {
			const [, post, part] = splitId(e.id);
			// only keep the ones that have a nested part
			if (!part) return null;
			return {
				params: { post, part },
				props: e,
			};
		})
		.filter(Boolean);
};
