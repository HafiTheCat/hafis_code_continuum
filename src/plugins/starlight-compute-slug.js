// export function generateSlug() {
// 	return function (tree, { data }) {
// 		const fm = file.data.astro?.frontmatter;
// 		if (!fm || !fm.topic || !fm.partof) return;
// 		const base = `/${fm.topic}/${fm.partof}/`;
// 		const part = fm.part !== undefined ? `part-${fm.part}/` : "";
// 		fm.slug = `${base}${part}`;
// 	};
// }

// export default function starlightComputeSlug() {
// 	return {
// 		name: "starlight-compute-slug",
// 		hooks: {
// 			"config:setup"({ config, updateConfig }) {
// 				const existing = config.markdown?.remarkPlugins || [];
// 				updateConfig({
// 					markdown: {
// 						remarkPlugins: [generateSlug, ...existing],
// 					},
// 				});
// 			},
// 		},
// 	};
// }
