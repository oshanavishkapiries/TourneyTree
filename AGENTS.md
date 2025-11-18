## Agent Instructions for elimination-tree

This document outlines the key commands, conventions, and guidelines for software agents working in this repository.

### Build, Lint, and Test Commands

- **Build:** `npm run build` (compiles TypeScript and builds with Vite)
- **Lint:** `npm run lint` (runs ESLint)
- **Dev Server:** `npm run dev` (starts the Vite development server)
- **Testing:** No test framework is configured.

### Code Style and Conventions

- **Formatting:** Follow existing code style. This project uses Prettier implicitly through ESLint plugins.
- **Imports:** Use named imports where possible. Group imports: 1. React, 2. external libraries, 3. internal components, 4. CSS.
- **Types:** This is a strict TypeScript project. Add types for all variables, parameters, and return values. Avoid `any`.
- **Naming:**
  - Components: `PascalCase` (e.g., `MyComponent.tsx`)
  - Functions/Variables: `camelCase` (e.g., `myFunction`)
- **Error Handling:** Use try/catch blocks for async operations and handle potential errors gracefully.
- **Styling:** Use CSS modules or a consistent styling approach found in the project.
- **Framework:** This is a React project using Vite. Use functional components with hooks.
