<img src="public/preview.png" />

# Mopet: SaaS Landing Page Template

Mopet is a modern, **neobrutalism-styled** [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) template designed for SaaS product landing pages. It provides an opinionated starting point with pre‑built sections—such as hero, features, testimonials and pricing—so you can launch a polished marketing site quickly.

## ✨ Features

- **Beautiful neo‑brutalist design** with responsive layouts and ready‑made section components.
- Built with **Next.js App Router** and **TypeScript** for type‑safety and performance.
- **Tailwind CSS** configured for rapid styling and dark‑mode support.
- Preconfigured for **pnpm** with ESLint, Prettier and Husky for consistent code style.
- Modular folder structure so you can add or remove sections as needed.

## 📸 Live Preview

A live preview of the default template is available at (add a deployed link here). The `/public/preview.png` image in this repository gives a quick visual overview.

## 🚀 Getting Started

This repository is a template. To create your own project from it, click **Use this template** on GitHub or run the GitHub CLI:

```bash
gh repo create my-saas-site --template vincedotcode/mopet
```

### Prerequisites

Ensure you have Node.js (v18 or later) and [pnpm](https://pnpm.io/) installed globally:

```bash
npm install -g pnpm
```

### Installation

Clone your newly created repository and install dependencies:

```bash
pnpm install
```

To start the development server:

```bash
pnpm run dev
```

Navigate to `http://localhost:3000` to view the site.

### Building for Production

To generate a production build:

```bash
pnpm run build
pnpm start
```

### Configuration

This template intentionally keeps its configuration simple. To customise the content and metadata:

- Edit `/app/layout.tsx` to update `<head>` tags and site metadata.
- Replace `/public/favicon.ico` and `/public/preview.png` with your own assets.
- Update `/app/page.tsx` to change sections, copy and calls to action.
- Each section in `components/sections` can be modified or removed to fit your needs.

For custom styling, open `tailwind.config.ts` and adjust colours, fonts or breakpoints. You can also copy styles from the [Neo‑brutalism Components styling docs](https://neobrutalism-components.vercel.app/docs/styling) into this file.

## 👋 Contributing

Contributions, issues and feature requests are welcome! If you'd like to add new sections or improve the design:

1. Fork this repo.
2. Create your feature branch: `git checkout -b my-feature`.
3. Commit your changes: `git commit -am 'Add my feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Create a pull request.

Please ensure any code you submit follows the linting rules (run `pnpm run lint` before submitting) and adds/updates relevant tests.

## 📰 License

This project is open-source and distributed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

If you encounter bugs or have questions, please open an issue. Feel free to reach out on (your preferred contact method) for support or to discuss improvements.
