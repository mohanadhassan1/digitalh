
Installation:
npm i @tanstack/react-query @tanstack/react-table @tanstack/react-query-devtools

npm i axios zustand 

npx shadcn@latest add chart table button input switch select dropdown-menu dialog form textarea data-table badge
npm i @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot

npm i class-variance-authority clsx tailwind-merge 
npm i lucide-react

npm i next-auth

npm i react-hook-form @hookform/resolvers zod

npm i react-toastify

npm i use-debounce


Structure:
## Project Structure

```bash
DIGITALH-DASHBOARD/
├── .next/
├── node_modules/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │   │   └── page.tsx
│   │   ├── (dashboardLayout)/
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
# │   │   ├── 404.tsx
# │   │   ├── 500.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   │── products/
│   │   │   ├── ProductTable.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── DeleteDialog.tsx
│   │   │   ├── ViewDialog.tsx
│   │   │── shared/
│   │   │   ├── Navbar.tsx
│   │   │── ui/
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── switch.tsx
│   │   │   └── table.tsx
│   │   │   ├── textarea.tsx
│   ├── enums/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useSessionSync.ts
│   ├── lib/
│   │   ├── api/
│   │   │   └── api-client.ts
│   │   │   └── axios-client.ts
│   │   ├── auth/
│   │   │   └── auth-options.ts
│   │   ├── constants/
│   │   │   └── route.ts
│   │   ├── models/
│   │   │   └── api.ts
│   │   │   └── auth.ts
│   │   │   └── index.ts
│   │   │   └── product.ts
│   │   │   └── table.ts
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
│   │   ├── RadioInput.tsx
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
