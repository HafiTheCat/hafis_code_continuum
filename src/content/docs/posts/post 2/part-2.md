---
slug: posts/markdown-style-guides/part-2
topic: posts
date: '2022-07-11'
title: Test post (Part 2) AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
description: How to use Markdown in Starlight
tags: ["lang/markdown", "content/guides"]
draft: true
---

![An illustration of planets and stars featuring the word “astro”](https://raw.githubusercontent.com/withastro/docs/main/public/default-og-image.png)

![A rocketship in space](/hcc_banner_dark.png)

This page describes how to use Markdown in Starlight.

## Inline Styles

# This is a heading

## This is a subheading

### This is a sub-subheading

## Introduction

I can link to [my conclusion](#conclusion) lower on the same page.

## Conclusion

`https://my-site.com/page1/#introduction` navigates directly to my Introduction.

## Headings

:::note
Starlight is a documentation website toolkit built with [Astro](https://astro.build/). You can get started with this command:

```sh
npm create astro@latest -- --template starlight
```

:::

:::tip[Did you know?]
Astro helps you build faster websites with [“Islands Architecture”](https://docs.astro.build/en/concepts/islands/).
:::

:::caution
If you are not sure you want an awesome docs site, think twice before using [Starlight](/).
:::

:::danger
Your users may be more productive and find your product easier to use thanks to helpful Starlight features.

- Clear navigation
- User-configurable colour theme
- [i18n support](/guides/i18n/)

:::

> This is a blockquote, which is commonly used when quoting another person or document.
>
> Blockquotes are indicated by a `>` at the start of each line.

```diff lang="js" {2-4} "syntax" /dataformat.*require/ ins="lang" del="(l)"
// my-test-file.js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l);
+ return true;
- not return true;
};
```

```bash title="Installing dependencies…"
npm install
```

```bash frame="none"
echo "This is not rendered as a terminal despite using the bash language"
```

<details>
<summary>Where and when is the Andromeda constellation most visible?</summary>

The [Andromeda constellation](<https://en.wikipedia.org/wiki/Andromeda_(constellation)>) is most visible in the night sky during the month of November at latitudes between `+90°` and `−40°`.

</details>

Expres