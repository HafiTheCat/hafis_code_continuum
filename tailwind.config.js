/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',            // or ['class', '[data-theme="dark"]']
	lightMode: '[data-theme="light"]',
	theme: { /* … */ },
	plugins: [require('@tailwindcss/typography'),require('@astrojs/starlight-tailwind')()],
  };
  
