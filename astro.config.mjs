// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import starlight from "@astrojs/starlight";
import { remarkReadingTime } from "./src/scripts/remark-plugins.mjs";
// import starlightComputeSlug from "./src/plugins/starlight-compute-slug.js";
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightFullViewMode from "starlight-fullview-mode";
import starlightImageZoom from "starlight-image-zoom";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightTocOverviewCustomizer from "starlight-toc-overview-customizer";
import rehypeExternalLinks from "rehype-external-links";
import starlightLinksValidator from "starlight-links-validator";

import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

let site = "https://blog.hafi.is-a.dev";
let hero_image = "/public/banner.png";
let title = "Hafi's Code Continuum";
let description =
	"Welcome to my personal blog where share anything that I find particularly interesting.";
let favicon = "/favicon.svg";

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: "always",

	markdown: {
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["noopener", "noreferrer"],
					content: { type: "text", value: " 🔗" },
				},
			],
		],
	},
	server: {
		headers: {
			//https://www.trevorlasn.com/blog/csp-headers-astro
			"Content-Security-Policy": `
			default-src 'self';
			script-src 'self' 'unsafe-inline' 'unsafe-eval';
			style-src 'self' 'unsafe-inline';
			img-src 'self' data: https:;
			font-src 'self';
			object-src 'none';
			base-uri 'self';
			form-action 'self';
			frame-ancestors 'none';
			block-all-mixed-content;
			upgrade-insecure-requests;
		  `,
		},
	},
	integrations: [
		starlight({
			editLink: {
				baseUrl: site + "/docs",
			},
			lastUpdated: true,
			routeMiddleware: "./src/scripts/routeData.ts",
			plugins: [
				starlightImageZoom(),
				starlightLinksValidator(),
				starlightTocOverviewCustomizer({
					overviewTitle: "Overview | Back to top ↥",
				}),
				starlightSidebarTopics(
					[
						{
							label: "Tags",
							link: "/tags/",
							icon: "seti:css",
							id: "tags",
							items: [{ label: "Tags", autogenerate: { directory: "tags" } }],
						},
						{
							label: "Posts",
							link: "/posts/",
							icon: "document",
							id: "posts",
							items: [{ label: "Posts", autogenerate: { directory: "posts" } }],
						},
						{
							label: "About",
							link: "/about",
							icon: "star",
							id: "about",
							items: [{ label: "About", autogenerate: { directory: "docs" } }],
						},
						{
							label: "Privacy",
							link: "/privacy",
							icon: "comment-alt",
							id: "privacy",
							items: [{ label: "Privacy", autogenerate: { directory: "docs" } }],
						},
					],
					{
						topics: {
							posts: ["/posts/**/*"],
							tags: ["/tags/**/*"],
							about: ["/about"],
							privacy: ["/privacy"],
						},
						exclude: ["/posts", "/about", "/tags", "/privacy"],
					}
				),
			],
			title,
			description,
			favicon,
			logo: {
				src: "/src/assets/icons/hafi_cc.svg",
				alt: "Hafi's Code Continuum logo",
			},
			components: {
				SocialIcons: "./src/components/overides/CustomSocialIcons.astro",
				Sidebar: "./src/components/overides/CustomSideBar.astro",
				PageTitle: "./src/components/overides/CustomPageTitle.astro",
				MarkdownContent: "./src/components/overides/MarkdownContentProseWrapper.astro",
			},
			expressiveCode: {
				styleOverrides: { borderRadius: "0.20rem" },
			},
			head: [
				{
					tag: "script",
					attrs: {
						src: "//gc.zgo.at/count.js",
						"data-goatcounter": "https://hafithecat.goatcounter.com/count",
						async: true,
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "og:image",
						content: hero_image,
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "twitter:url",
						content: site,
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "twitter:title",
						content: title,
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "twitter:description",
						content: description,
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "twitter:image",
						content: hero_image,
					},
				},
				{
					tag: "link",
					attrs: {
						property: "canonical",
						content: site,
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "keywords",
						content:
							"Rust Programming Language, Rust Programming, Problem Solving, Debugging, Code Experiments, Programming Tips, Software Development, Coding Challenges, Trial and Error, Exploratory Coding, Tech Solutions",
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "author",
						content: "HafiTheCat",
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "copyright",
						content: "Copyright © " + new Date().getFullYear() + " Hafi's Code Continuum",
					},
				},
			],
			customCss: ["./src/styles/global.css"],
		}),
		mdx(),
		sitemap(),
		svelte(),
	],

	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		domains: [],
	},
	adapter: netlify({
		cacheOnDemandPages: true,
	}),
});
