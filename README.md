# 🚀 DIGITALH Dashboard – Frontend Challenge

Welcome to the DIGITALH Frontend Challenge! This project is a CRUD operations dashboard built with Next.js, TypeScript, Zustand, NextAuth.js, and Shadcn UI. It demonstrates advanced UI/UX features like pagination, filtering, server-side rendering, and more.

🚀 Live Demo
<a href="https://digitalh-six.vercel.app" target="_blank">View Live Demo</a>

---

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API](#api)
- [Bonus Points](#bonus-points)
- [Submission](#submission)

---

## 🔍 Overview

This challenge simulates a real-world dashboard used for managing products. It includes authentication, advanced product management (CRUD), UI components, reusable patterns, and scalable code structure.

---


## ⚙️ Tech Stack

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)
- [Zod](https://zod.dev/) (optional for form validation)
- [Axios](https://axios-http.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

## ✨ Features

### 🔑 Authentication
- Email/password login using NextAuth.js
- Redirect after login
- Unauthorized access handling

### 📊 Products Dashboard
- Products table with **edit**, **delete**, and **view** buttons
- Server-side filtering and search (via query params)
- Server-side pagination
- Column sorting
- Responsive design with hover states and modals

### ➕ Add Product
- Modal-based form
- Validated using Zod

### ✏️ Edit Product
- Modal with pre-filled form
- Edit and update functionality

### 🗑️ Delete Product
- Confirmation dialog
- Removes product on confirmation

### 🔍 View Product Details
- Modal view with all product information

---

## 💾 Installation

> Prerequisites:
- Node.js 18.x or higher
- npm or yarn installed

npm i @tanstack/react-query @tanstack/react-table @tanstack/react-query-devtools
npm i axios zustand 
npx shadcn@latest add table button input dialog data-table badge
npm i @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot
npm i class-variance-authority clsx tailwind-merge 
npm i lucide-react
npm i next-auth
npm i react-hook-form @hookform/resolvers zod
npm i react-toastify
npm i use-debounce

```bash
git clone https://github.com/mohanadhassan1/digitalh.git
cd digitalh-dashboard

# Install all dependencies
npm install

# Run development server
npm run dev
```

---
## 📚 Project Structure

```bash
DIGITALH-DASHBOARD/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │   │   └── page.tsx
│   │   ├── (dashboardLayout)/
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── route.ts
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   ├── unauthorized/
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   │── auth/
│   │   │   ├── with-role.tsx
│   │   │── products/
│   │   │   ├── DeleteDialog.tsx
│   │   │   ├── ProductActionsCell.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProductSearchBar.tsx
│   │   │   ├── ProductTable.tsx
│   │   │   ├── ProductTableColumns.tsx
│   │   │   ├── ProductTableEmptyState.tsx
│   │   │   ├── ProductTableHeader.tsx
│   │   │   ├── ViewDialog.tsx
│   │   │── shared/
│   │   │   ├── Navbar.tsx
│   │   │── ui/
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   └── table.tsx
│   ├── constants/
│   │   └── images.tsx
│   ├── enums/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useCategories.ts
│   │   ├── useCreateProduct.ts
│   │   ├── useDeleteProduct.ts
│   │   ├── useProduct.ts
│   │   ├── useProducts.ts
│   │   ├── useProductTable.ts
│   │   ├── useSessionSync.ts
│   │   ├── useUpdateProduct.ts
│   ├── lib/
│   │   ├── api/
│   │   │   └── api-client.ts
│   │   │   └── axios-client.ts
│   │   ├── auth/
│   │   │   └── auth-options.ts
│   │   ├── models/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   ├── error.ts
│   │   │   ├── index.ts
│   │   │   ├── product.ts
│   │   │   ├── table.ts
│   │   │   └── utils.ts
│   │   ├── store/
│   │   │   └── auth-store.ts
│   │   │   └── product-store.ts
│   │   ├── index.ts
│   │   ├── Notifications.tsx
│   │   └── utils.ts
│   ├── providers/
│   │   ├── Authprovider.tsx
│   │   ├── Hydrate.ts
│   │   ├── Queryprovider.tsx
│   ├── UI/
│   │   ├── Button.tsx
│   │   ├── data-table.tsx
│   │   ├── EmptyComponent.tsx
│   │   ├── Loading.tsx
│   │   ├── SelectInput.tsx
│   │   └── TextInput.tsx
│   ├── utils/
│   │   ├── general.ts
│   │   ├── index.ts
│   │   ├── validation.ts
│   └── middleware.ts
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
```

---

## 🌐 API

This project uses mocked endpoints from:
https://fakeapi.platzi.com/

---

## 🚀 Bonus Points Implemented

✅ TypeScript support
✅ Axios Interceptors
✅ React Query for API state management
✅ Reusable components
✅ Scalable project structure
✅ SOLID principles
✅ GitHub feature branches

---

## 📌 Submission
✅ Live demo deployed on Vercel: <a href="https://digitalh-six.vercel.app" target="_blank">View Live Demo</a>
✅ Public GitHub Repo: <a href="https://github.com/mohanadhassan1/digitalh.git" target="_blank">GitHub URL</a>