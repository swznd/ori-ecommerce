# Ori Ecommerce

Welcome to the codebase for **Ori Ecommerce** — an online shop website

This frontend project is built with:

- ⚛️ React (with Vite)
- 🎨 Tailwind CSS v4 + DaisyUI 5
- 📦 Modular component structure
- 🛍️ Product data powered by JSON (soon to be API)

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

> Note: Make sure you're using Node.js v18 or higher

---

## 📁 Project Structure

```
src/
├── fnn-components/     # Reusable UI components
├── pages/              # Page-level layout (Home, etc)
├── data/               # Product JSON for now
├── utils/              # Helper functions
└── App.jsx             # Root component
```

---

## 🧩 Key Components

### ✅ FnnListProducts

Displays a list of product cards with flexible filtering.

**Props:**

- `filter`: object — `{ limit, category, sale }`
- `className`: optional — override layout style

**Usage Example:**

```jsx
<FnnListProducts filter={{ sale: true, limit: 5 }} className="grid-cols-3" />
```

---

### ✅ FnnCard

Card component to display product info with variant selection.

**Props:**

- `product`: object — product data from JSON

**Built-in Features:**

- Displays product image, name, price (with sale), stock info
- Variant selection by color
- Uses subcomponents: ProductImage, ProductTitle, ProductPrice, etc.

---

## 🧱 Patterns & Conventions

### className Override Pattern

Let outer components control layout:

```js
const defaultClass = 'grid gap-6 md:grid-cols-3';
return <div className={className ?? defaultClass} />;
```

### Prop Structure

Group props logically (e.g. `filter`) to avoid bloating the prop list.

### File Naming

Use PascalCase for components:

```
✅ FnnCard.jsx
✅ ProductImage.jsx
✅ FnnListProducts.jsx
```

---

## 💬 Notes for Future Me

This README is the main place to keep track of props, layout patterns, and best practices for solo dev workflow.  
Other docs (like `components.md` or `patterns.md`) will be split out later if the project scales or team grows.
