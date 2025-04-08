# Dobbin IP Law Website

This is the official website for Dobbin IP Law P.C., a boutique intellectual property law firm specializing in patents, trademarks, and copyrights.

## Technologies Used

- [Nuxt 3](https://nuxt.com/) - Vue.js framework
- [@nuxt/content](https://content.nuxtjs.org/) - Git-based headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Content Management

This website uses @nuxt/content to manage content. All content is stored in Markdown files in the `content` directory.

### Adding New Content

To add new content:

1. Create a new `.md` file in the `content` directory
2. Add frontmatter (metadata) at the top of the file
3. Write your content in Markdown format

Example:

```md
---
title: 'My New Page'
description: 'Description of my new page'
---

## Content Header

This is the content of my new page.
```

### Editing Existing Content

To edit existing content, simply modify the corresponding `.md` file in the `content` directory.

## License

All rights reserved.
